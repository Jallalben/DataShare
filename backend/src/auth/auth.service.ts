import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException("Cet utilisateur existe déjà.");
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    // On ne retourne pas le mot de passe dans la réponse
    const { password: _, ...result } = user;
    return result;
  }
}
