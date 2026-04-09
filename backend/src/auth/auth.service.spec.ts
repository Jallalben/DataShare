import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('mockToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw ConflictException if user already exists', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue({ id: '1', email: 'test@test.com' });
      
      await expect(service.register({ email: 'test@test.com', password: 'password123' }))
        .rejects.toThrow(ConflictException);
    });

    it('should create a user and return result without password', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);
      (usersService.create as jest.Mock).mockResolvedValue({ 
        id: '1', 
        email: 'test@test.com', 
        password: 'hashedPassword' 
      });

      const result = await service.register({ email: 'test@test.com', password: 'password123' });
      
      expect(result).not.toHaveProperty('password');
      expect(result.email).toBe('test@test.com');
      expect(usersService.create).toHaveBeenCalled();
    });
  });
});
