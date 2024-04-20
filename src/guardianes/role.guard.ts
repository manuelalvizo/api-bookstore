import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles:string[] = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
        return true;
    }
    const request = context.switchToHttp().getRequest();
    if(!request.headers.authorization){
        throw new UnauthorizedException('Token inválido o no proporcionado');
    }
    const token = request.headers.authorization.split(' ')[1]; // Obtener el token del encabezado Authorization
    try {
      const decodedToken = this.jwtService.verify(token);
      const userRole = decodedToken.roles; // Obtener el parámetro 'role' del token
      const hasMatchingRole = roles.some(role => userRole.includes(role));
      return hasMatchingRole; // Verificar si el usuario tiene el rol adecuado
    } catch (error) {
        console.log("LINEA 25")
      throw new UnauthorizedException('Token inválido o no proporcionado');
    }
  }
}