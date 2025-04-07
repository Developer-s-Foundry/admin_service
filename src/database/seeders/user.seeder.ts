import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
export async function seedUsers(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);

  const users = [
    { username: 'dan_nura', email: 'nura@example.com', password: 'password123' },
    { username: 'ife_oluwa', email: 'ife@example.com', password: 'password456' },
  ];

  for (const user of users) {
    const existingUser = await userRepository.findOneBy({ email: user.email });
    if (!existingUser) {
      await userRepository.save(user);
    }
  }
}