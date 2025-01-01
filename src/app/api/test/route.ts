import { db } from "@/db";
import { invt } from "@/db/schema/invt";
import { faker } from "@faker-js/faker";

export async function GET(request: Request) {
  try {
    const distinctInvts = await db.selectDistinct({ sn: invt.sn }).from(invt);
    // const serialNumbers = distinctSN.map((sn) => sn.sn);

    if (!distinctInvts.length) {
      return Response.json([], {
        status: 200,
      });
    }

    const newInvtData = distinctInvts.map((invt) => ({
      ...invt,

      timestamp: new Date().toISOString(),
      internaltemp: faker.number.int({ min: 10000, max: 30000 }),
      pv1InputVoltageV: faker.number.int({ min: 10000, max: 30000 }),
      pv1InputCurrentA: faker.number.int({ min: 1000, max: 10000 }),
      dailyGenerationKwh: faker.number.int({ min: 10000, max: 30000 }),
      totalPowerGenerationKwh: faker.number.int({ min: 10000, max: 30000 }),
      alarm: faker.string.fromCharacters(["01-02", ""]),
      dailyLoadKwh: faker.number.int({ min: 1000, max: 10000 }),
      totalLoadConsumptionKwh: faker.number.int({ min: 10000, max: 30000 }),
      totalreactivepowerVar: faker.number.int({ min: 100, max: 1000 }),
      activepowerW: faker.number.int({ min: 1000, max: 10000 }),
      loadPowerKw: faker.number.int({ min: 10, max: 50 }),
    }));

    const insertedInvtData = await db
      .insert(invt)
      .values(newInvtData)
      .returning();

    return Response.json(insertedInvtData, {
      status: 200,
    });
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 400,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const distinctInvts = await db.selectDistinct({ sn: invt.sn }).from(invt);
    const distinctSNs = distinctInvts.map((sn) => sn.sn);
    const randSN = faker.string.numeric(6);

    let isRandSnUnique = false;

    while (!isRandSnUnique) {
      if (!distinctSNs.includes(randSN)) {
        isRandSnUnique = true;
      }
    }

    const [insertedInvt] = await db
      .insert(invt)
      .values({
        sn: randSN,
        timestamp: new Date().toISOString(),
        internaltemp: faker.number.int({ min: 10000, max: 30000 }),
        pv1InputVoltageV: faker.number.int({ min: 10000, max: 30000 }),
        pv1InputCurrentA: faker.number.int({ min: 1000, max: 10000 }),
        dailyGenerationKwh: faker.number.int({ min: 10000, max: 30000 }),
        totalPowerGenerationKwh: faker.number.int({ min: 10000, max: 30000 }),
        alarm: faker.string.fromCharacters(["01-02", ""]),
        dailyLoadKwh: faker.number.int({ min: 1000, max: 10000 }),
        totalLoadConsumptionKwh: faker.number.int({ min: 10000, max: 30000 }),
        totalreactivepowerVar: faker.number.int({ min: 100, max: 1000 }),
        activepowerW: faker.number.int({ min: 1000, max: 10000 }),
        loadPowerKw: faker.number.int({ min: 10, max: 50 }),
      })
      .returning();

    return Response.json(insertedInvt, {
      status: 200,
    });
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 400,
      }
    );
  }
}
