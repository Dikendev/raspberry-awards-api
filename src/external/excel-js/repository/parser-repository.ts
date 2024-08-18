import * as ExcelJS from 'exceljs';

export abstract class ParserRepository {
  read: (workSheet: Express.Multer.File) => Promise<ExcelJS.Workbook>;
  readLocal: () => Promise<ExcelJS.Workbook>;
}
