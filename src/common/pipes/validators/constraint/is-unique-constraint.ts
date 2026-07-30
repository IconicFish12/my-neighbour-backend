/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable, Scope } from '@nestjs/common';
import { SchemaModels } from '../schema-models';
import { PrismaClient as GeneratedPrismaClient } from '../../../../database/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable({ scope: Scope.REQUEST })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  private prismaClient: GeneratedPrismaClient;

  constructor() {
    const connectionString =
      process.env.DATABASE_URL_SUPABASE || process.env.DATABASE_URL || '';
    const adapter = new PrismaPg({ connectionString });
    this.prismaClient = new GeneratedPrismaClient({ adapter });
  }

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    if (!this.prismaClient) {
      return false;
    }

    const [model, field, excludeIdField] = args.constraints as [
      SchemaModels,
      string,
      string?,
    ];

    if (value === undefined || value === null || value === '') {
      return true;
    }

    const modelAccessor: { findFirst: (args: any) => Promise<any> } = (
      this.prismaClient as any
    )[model];

    if (!modelAccessor || typeof modelAccessor.findFirst !== 'function') {
      console.error(
        `IsUniqueConstraint: Model "${String(model)}" tidak ditemukan atau tidak mendukung findFirst.`,
      );
      return false;
    }

    const whereCondition: { [key: string]: any } = {
      [field]: value,
    };

    if (
      excludeIdField &&
      args.object &&
      (args.object as Record<string, any>)[excludeIdField]
    ) {
      const excludeId = (args.object as Record<string, any>)[excludeIdField];
      whereCondition.NOT = {
        id: excludeId,
      };
    }

    try {
      const existingRecord = await modelAccessor.findFirst({
        where: whereCondition,
      });
      return !existingRecord;
    } catch (error) {
      console.error(
        `IsUniqueConstraint: Database error checking uniqueness for ${model}.${field}:`,
        error,
      );
      return false;
    }
  }

  defaultMessage(args: ValidationArguments): string {
    const [, field] = args.constraints as [SchemaModels, string, string?];
    return `Nilai '${args.value}' untuk field '${field}' sudah ada.`;
  }
}
