import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const atributes: any = [
    {
        name: "title",
        value: "hexagon"
    },
    {
        name: "primaryColor",
        value: "#fff"
    },
    {
        name: "secondaryColor",
        value: "#000"
    },
    {
        name: "language",
        value: "en-US"
    }
  ]

  atributes.forEach(async (element: { name: any; value: any; }) => {
    await prisma.attribute.create({data:{
        name: element.name,
        value: element.value
      }})
  })
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