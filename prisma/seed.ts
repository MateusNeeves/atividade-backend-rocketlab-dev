import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  // Seed para produtos
  await prisma.product.createMany({
    data: [
      {
        name: 'Smartphone XYZ',
        description: 'Um smartphone moderno com excelentes recursos',
        price: 1999.99,
        brand: 'TechBrand',
        category: 'Eletrônicos',
        imageUrl: 'https://example.com/smartphone.jpg',
        dim_width: 7.5,
        dim_height: 15.0,
        dim_length: 0.8
      },
      {
        name: 'Laptop UltraBook',
        description: 'Laptop leve e poderoso para profissionais',
        price: 4500.00,
        brand: 'CompTech',
        category: 'Computadores',
        imageUrl: 'https://example.com/laptop.jpg',
        dim_width: 30.5,
        dim_height: 1.5,
        dim_length: 20.0
      },
      {
        name: 'Smart TV 4K 55"',
        description: 'TV com resolução 4K e tecnologia HDR',
        price: 3299.99,
        brand: 'VisionTech',
        category: 'Eletrônicos',
        imageUrl: 'https://example.com/tv.jpg',
        dim_width: 123.0,
        dim_height: 72.0,
        dim_length: 5.8
      },
      {
        name: 'Fone de Ouvido Bluetooth',
        description: 'Fone sem fio com cancelamento de ruído',
        price: 399.90,
        brand: 'AudioMax',
        category: 'Acessórios',
        imageUrl: 'https://example.com/headphones.jpg',
        dim_width: 18.0,
        dim_height: 20.5,
        dim_length: 8.0
      },
      {
        name: 'Impressora Multifuncional',
        description: 'Impressora, scanner e copiadora em um só equipamento',
        price: 799.90,
        brand: 'PrintAll',
        category: 'Escritório',
        imageUrl: 'https://example.com/printer.jpg',
        dim_width: 45.0,
        dim_height: 30.0,
        dim_length: 38.0
      },
      {
        name: 'Câmera DSLR Profissional',
        description: 'Câmera digital de 24MP com lente intercambiável',
        price: 5299.00,
        brand: 'PhotoPro',
        category: 'Fotografia',
        imageUrl: 'https://example.com/camera.jpg',
        dim_width: 15.0,
        dim_height: 10.0,
        dim_length: 7.5
      },
      {
        name: 'Tablet Educacional',
        description: 'Tablet de 10 polegadas ideal para estudos',
        price: 1499.00,
        brand: 'LearnTab',
        category: 'Eletrônicos',
        imageUrl: 'https://example.com/tablet.jpg',
        dim_width: 24.0,
        dim_height: 17.0,
        dim_length: 0.8
      },
      {
        name: 'Smartwatch Fitness',
        description: 'Relógio inteligente com monitor cardíaco e GPS',
        price: 899.90,
        brand: 'FitWear',
        category: 'Wearable',
        imageUrl: 'https://example.com/smartwatch.jpg',
        dim_width: 4.5,
        dim_height: 4.5,
        dim_length: 1.2
      },
      {
        name: 'Console de Videogame',
        description: 'Console de última geração com 1TB de armazenamento',
        price: 4999.00,
        brand: 'GameStation',
        category: 'Games',
        imageUrl: 'https://example.com/console.jpg',
        dim_width: 30.0,
        dim_height: 8.0,
        dim_length: 25.0
      },
      {
        name: 'Roteador Wi-Fi Mesh',
        description: 'Sistema de rede mesh para cobertura completa da casa',
        price: 1299.00,
        brand: 'NetConnect',
        category: 'Redes',
        imageUrl: 'https://example.com/router.jpg',
        dim_width: 12.0,
        dim_height: 4.5,
        dim_length: 12.0
      }
    ]
  });
  
  console.log('Seed executado com sucesso!');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })