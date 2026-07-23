import apiClient from '../lib/axios'
import type { DashboardData } from '../types/dashboard'

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await apiClient.get<DashboardData>('/dashboard-api')
    return response.data
  },
}
