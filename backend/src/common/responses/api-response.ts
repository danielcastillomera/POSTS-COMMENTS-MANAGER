export class ApiResponse<T = unknown> {
  static success<T>(data: T, message = 'OK'): { success: true; message: string; data: T } {
    return { success: true, message, data };
  }

  static error(message: string, status = 400): { success: false; message: string; status: number } {
    return { success: false, message, status };
  }

  static bulk(inserted: number, total: number) {
    return {
      success: true,
      message: `${inserted} de ${total} registros insertados correctamente.`,
      data: { inserted, total },
    };
  }

  static paginated<T>(data: T[], total: number, page: number, limit: number, message = 'OK') {
    return {
      success: true,
      message,
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }
}
