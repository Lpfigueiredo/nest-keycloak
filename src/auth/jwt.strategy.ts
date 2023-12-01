import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `http://localhost:8080/realms/myrealm/protocol/openid-connect/certs`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'account',
      issuer: 'http://localhost:8080/realms/myrealm',
      algorithms: ['RS256'],
    });
  }

  validate(payload: unknown): unknown {
    console.log(payload);
    return payload;
  }
}
