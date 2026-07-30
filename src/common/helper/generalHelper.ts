import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GeneralHelper {
  private readonly folderPath: string;

  constructor() {
    this.folderPath = 'src/common/uploads/';
  }

  public twoDecimal(input: number) {
    return parseFloat((input * 100).toFixed(2));
  }

  public static readonly FileDictionary: Record<string, string> = {
    'image/jpg': 'images',
    'image/png': 'images',
    'image/jpeg': 'images',
    'application/pdf': 'documents/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'documents/docx',
    'application/msword': 'documents/doc',
    'text/plain': 'documents/txt',
    'text/csv': 'documents/csv',
    'application/vnd.ms-excel.sheet.macroenabled.12': 'documents/xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'documents/xlsx',
  };

  public static getFolderExtension(mimetype: string): string {
    const mime = mimetype.toLowerCase();
    if (mime in this.FileDictionary) {
      return this.FileDictionary[mime] || 'others';
    }
    return 'others';
  }

  public static ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  public getFolderPath(): string {
    return this.folderPath;
  }

  public static getFullFilePath(relativePath: string): string {
    return path.join(process.cwd(), 'src/common/uploads', relativePath);
  }

  public static fileExists(relativePath: string): boolean {
    const fullPath = this.getFullFilePath(relativePath);
    return fs.existsSync(fullPath);
  }

  public static getFileSize(relativePath: string): number {
    const fullPath = this.getFullFilePath(relativePath);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      return stats.size;
    }
    return 0;
  }

  public static deleteFile(relativePath: string): boolean {
    try {
      const fullPath = this.getFullFilePath(relativePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  public static async deleteFileAsync(relativePath: string): Promise<boolean> {
    try {
      const fullPath = this.getFullFilePath(relativePath);
      if (fs.existsSync(fullPath)) {
        await fs.promises.unlink(fullPath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }
}
