import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';
import { ContextStorageServiceKey } from '../domain/context-storage-service.interface';
import { ClsContextStorageService } from './cls/cls-context-storage.service';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['x-correlation-id'] ?? v4(),
      },
    }),
  ],
  providers: [
    { provide: ContextStorageServiceKey, useClass: ClsContextStorageService },
  ],
  exports: [ContextStorageServiceKey],
})
export class ContextModule {}
