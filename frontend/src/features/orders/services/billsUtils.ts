import { billsService } from "./billsService";

export async function getOrCreateOpenBill(tableId: number) {
  // 1. Intentar obtener factura abierta
  const bills = await billsService.getBills(tableId, "open");

  if (bills.length > 0) {
    // Ya hay una factura abierta, usar la primera
    return bills[0];
  } else {
    // No hay factura abierta, crear una nueva
    const newBill = await billsService.createBill({
      table: tableId,
      status: "open",
    });
    return newBill;
  }
}
