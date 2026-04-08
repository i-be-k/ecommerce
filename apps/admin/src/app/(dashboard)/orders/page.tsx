import { auth } from "@clerk/nextjs/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { OrderType } from "@repo/types";

const getData = async (): Promise<OrderType[]> => {
  // return [
  //   {
  //     id: "728ed521",
  //     amount: 134000.00,
  //     status: "pending",
  //     fullName: "Ibek Dev",
  //     userId: "44",
  //     email: "ibkodify@gmail.com",
  //   },
  //   {
  //     id: "728ed522",
  //     amount: 124000.00,
  //     status: "success",
  //     fullName: "Jane Doe",
  //     userId: "35",
  //     email: "janedoe@gmail.com",
  //   },
  //   {
  //     id: "728ed523",
  //     amount: 167000.00,
  //     status: "success",
  //     fullName: "Mike Galloway",
  //     userId: "11",
  //     email: "mikegalloway@gmail.com",
  //   },
  //   {
  //     id: "728ed524",
  //     amount: 156000.00,
  //     status: "failed",
  //     fullName: "Minerva Robinson",
  //     userId: "20",
  //     email: "minerbarobinson@gmail.com",
  //   },
  //   {
  //     id: "728ed525",
  //     amount: 145000.00,
  //     status: "success",
  //     fullName: "Mable Clayton",
  //     userId: "21",
  //     email: "mableclayton@gmail.com",
  //   },
  //   {
  //     id: "728ed526",
  //     amount: 189000.00,
  //     status: "pending",
  //     fullName: "Nathan McDaniel",
  //     userId: "64",
  //     email: "nathanmcdaniel@gmail.com",
  //   },
  //   {
  //     id: "728ed527",
  //     amount: 178000.00,
  //     status: "success",
  //     fullName: "Myrtie Lamb",
  //     userId: "18",
  //     email: "myrtielamb@gmail.com",
  //   },
  //   {
  //     id: "728ed528",
  //     amount: 190000.00,
  //     status: "success",
  //     fullName: "Leona Bryant",
  //     userId: "59",
  //     email: "leonabryant@gmail.com",
  //   },
  //   {
  //     id: "728ed529",
  //     amount: 134000.00,
  //     status: "failed",
  //     fullName: "Aaron Willis",
  //     userId: "69",
  //     email: "aaronwillis@gmail.com",
  //   },
  //   {
  //     id: "728ed52a",
  //     amount: 543000.00,
  //     status: "success",
  //     fullName: "Joel Keller",
  //     userId: "18",
  //     email: "joelkeller@gmail.com",
  //   },
  //   {
  //     id: "728ed52b",
  //     amount: 234000.00,
  //     status: "pending",
  //     fullName: "Daniel Ellis",
  //     userId: "88",
  //     email: "danielellis@gmail.com",
  //   },
  //   {
  //     id: "728ed52c",
  //     amount: 345000.00,
  //     status: "success",
  //     fullName: "Gordon Kennedy",
  //     userId: "80",
  //     email: "gordonkennedy@gmail.com",
  //   },
  //   {
  //     id: "728ed52d",
  //     amount: 335000.00,
  //     status: "failed",
  //     fullName: "Emily Hoffman",
  //     userId: "24",
  //     email: "emilyhoffman@gmail.com",
  //   },
  //   {
  //     id: "728ed52e",
  //     amount: 664000.00,
  //     status: "pending",
  //     fullName: "Jeffery Garrett",
  //     userId: "38",
  //     email: "jefferygarrett@gmail.com",
  //   },
  //   {
  //     id: "728ed52f",
  //     amount: 332000.00,
  //     status: "success",
  //     fullName: "Ralph Baker",
  //     userId: "82",
  //     email: "ralphbaker@gmail.com",
  //   },
  //   {
  //     id: "728ed52g",
  //     amount: 413000.00,
  //     status: "failed",
  //     fullName: "Seth Fields",
  //     userId: "54",
  //     email: "sethfields@gmail.com",
  //   },
  //   {
  //     id: "728ed52h",
  //     amount: 345000.00,
  //     status: "pending",
  //     fullName: "Julia Webb",
  //     userId: "24",
  //     email: "juliawebb@gmail.com",
  //   },
  //   {
  //     id: "728ed52i",
  //     amount: 754000.00,
  //     status: "success",
  //     fullName: "Gary Banks",
  //     userId: "41",
  //     email: "garybanks@gmail.com",
  //   },
  //   {
  //     id: "728ed52j",
  //     amount: 643000.00,
  //     status: "failed",
  //     fullName: "Flora Chambers",
  //     userId: "68",
  //     email: "florachambers@gmail.com",
  //   },
  //   {
  //     id: "728ed52k",
  //     amount: 543000.00,
  //     status: "pending",
  //     fullName: "Steve Hanson",
  //     userId: "33",
  //     email: "stevehanson@gmail.com",
  //   },
  //   {
  //     id: "728ed52l",
  //     amount: 324000.00,
  //     status: "success",
  //     fullName: "Lola Robinson",
  //     userId: "18",
  //     email: "lolarobinson@gmail.com",
  //   },
  //   {
  //     id: "728ed52m",
  //     amount: 123000.00,
  //     status: "pending",
  //     fullName: "Ethel Waters",
  //     userId: "34",
  //     email: "ethelwaters@gmail.com",
  //   },
  //   {
  //     id: "728ed52n",
  //     amount: 422000.00,
  //     status: "failed",
  //     fullName: "Grace Edwards",
  //     userId: "67",
  //     email: "graceedwards@gmail.com",
  //   },
  //   {
  //     id: "728ed52o",
  //     amount: 712000.00,
  //     status: "success",
  //     fullName: "Sallie Wong",
  //     userId: "79",
  //     email: "salliewong@gmail.com",
  //   },
  //   {
  //     id: "728ed52p",
  //     amount: 360000.00,
  //     status: "success",
  //     fullName: "Bryan Gutierrez",
  //     userId: "59",
  //     email: "bryangutierrez@gmail.com",
  //   },
  //   {
  //     id: "728ed52q",
  //     amount: 454000.00,
  //     status: "pending",
  //     fullName: "Erik Rice",
  //     userId: "17",
  //     email: "erikrice@gmail.com",
  //   },
  //   {
  //     id: "728ed52r",
  //     amount: 382000.00,
  //     status: "success",
  //     fullName: "Jordan Atkins",
  //     userId: "74",
  //     email: "jordanatkins@gmail.com",
  //   },
  //   {
  //     id: "728ed52s",
  //     amount: 328000.00,
  //     status: "failed",
  //     fullName: "Bill Brewer",
  //     userId: "98",
  //     email: "billbrewer@gmail.com",
  //   },
  //   {
  //     id: "728ed52t",
  //     amount: 250000.00,
  //     status: "success",
  //     fullName: "Edwin Morris",
  //     userId: "87",
  //     email: "edwinmorris@gmail.com",
  //   },
  //   {
  //     id: "728ed52u",
  //     amount: 658000.00,
  //     status: "success",
  //     fullName: "Harold Becker",
  //     userId: "61",
  //     email: "haroldbecker@gmail.com",
  //   },
  //   {
  //     id: "728ed52v",
  //     amount: 691000.00,
  //     status: "success",
  //     fullName: "Hannah Rodriguez",
  //     userId: "77",
  //     email: "hannahrodriguez@gmail.com",
  //   },
  //   {
  //     id: "728ed52w",
  //     amount: 969000.00,
  //     status: "success",
  //     fullName: "Zachary Beck",
  //     userId: "83",
  //     email: "zacharybeck@gmail.com",
  //   },
  //   {
  //     id: "728ed52x",
  //     amount: 617000.00,
  //     status: "failed",
  //     fullName: "Frances Potter",
  //     userId: "68",
  //     email: "francespotter@gmail.com",
  //   },
  //   {
  //     id: "728ed52y",
  //     amount: 173000.00,
  //     status: "success",
  //     fullName: "Raymond Murray",
  //     userId: "55",
  //     email: "raymondmurray@gmail.com",
  //   },
  //   {
  //     id: "728ed52z",
  //     amount: 843000.00,
  //     status: "success",
  //     fullName: "Adam Sherman",
  //     userId: "32",
  //     email: "adamsherman@gmail.com",
  //   },
  //   {
  //     id: "728ed521f",
  //     amount: 914000.00,
  //     status: "pending",
  //     fullName: "Anne Cruz",
  //     userId: "19",
  //     email: "annecruz@gmail.com",
  //   },
  // ];
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const OrdersPage = async () => {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Payments</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default OrdersPage;
