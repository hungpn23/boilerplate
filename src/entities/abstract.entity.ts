import { SYSTEM } from '@/constants';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DataSource,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { getOrder, Order } from '../decorators/order.decorator';

export abstract class AbstractEntity extends BaseEntity {
  @Order(9999)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Order(9999)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Order(9999)
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  deletedAt: Date;

  @Order(9999)
  @Column({
    name: 'created_by',
    default: SYSTEM,
  })
  createdBy: string;

  @Order(9999)
  @Column({
    name: 'updated_by',
    default: SYSTEM,
  })
  updatedBy: string;

  @Order(9999)
  @Column({
    name: 'deleted_by',
    default: SYSTEM,
  })
  deletedBy: string;

  // issue: https://github.com/typeorm/typeorm/issues/541#issuecomment-2014291439
  static useDataSource(dataSource: DataSource) {
    BaseEntity.useDataSource.call(this, dataSource);
    const meta = dataSource.entityMetadatasMap.get(this);
    if (meta != null) {
      // reorder columns here
      meta.columns = [...meta.columns].sort((x, y) => {
        const orderX = getOrder((x.target as any).prototype, x.propertyName);
        const orderY = getOrder((y.target as any).prototype, y.propertyName);
        return orderX - orderY;
      });
    }
  }
}
