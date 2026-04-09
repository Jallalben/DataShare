import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  @IsNotEmpty({ message: "L'email est requis." })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  password: string;
}
