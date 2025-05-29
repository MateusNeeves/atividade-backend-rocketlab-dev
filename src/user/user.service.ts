import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!(await this.prisma.user.findUnique({ where: { id: id }}))) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { id: idFromDto, ...dataToUpdate } = updateUserDto as any;

    if (Object.keys(dataToUpdate).length === 0) {
      throw new BadRequestException('No data provided for update');
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
