import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  @IsNotEmpty({ message: "L'email est requis." })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  password: string;
}
