import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';
// import { IsUnique } from 'src/common/pipes/validators/is-unique-validators';

export class SignInRequest {
  @IsString({ message: 'Username harus berupa teks' })
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @MinLength(5, { message: 'Username harus lebih dari 5 karakter' })
  readonly identifier: string;

  @IsString({ message: 'Password harus berupa teks' })
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(4, { message: 'Password minimal 4 karakter' })
  @IsStrongPassword(
    {
      minLength: 4,
      minLowercase: 1,
      minNumbers: 3,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: 'Kata sandi harus minimal 4 karakter, 3 angka, dan 1 simbol.',
    },
  )
  @MaxLength(15, {
    message: 'Password maksimal 15 karakter',
  })
  readonly password: string;
}
