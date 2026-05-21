export class ApiResponse<T = unknown> {
  static success<T>(
    data: T,
    message = 'OK',
  ): { success: true; message: string; data: T } {
    return { success: true, message, data };
  }

  static error(
    message: string,
    status = 400,
  ): { success: false; message: string; status: number } {
    return { success: false, message, status };
  }

  static bulk(
    inserted: number,
    total: number,
  ): { success: true; message: string; data: { inserted: number; total: number } } {
    return {
      success: true,
      message: `${inserted} of ${total} records inserted successfully`,
      data: { inserted, total },
    };
  }
}
