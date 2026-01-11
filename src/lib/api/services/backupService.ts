/**
 * Сервис управления бэкапами для SvelteKit API
 * Обеспечивает централизованное хранение и управление бэкапами
 */

// Тип для бэкапа
export interface Backup {
    id: string;
    description: string;
    dataTypes: string[];
    data: Record<string, any>;
    size: number;
    status: string;
    version: string;
    createdAt: string;
    createdBy: string;
    restoreHistory?: Array<{
        restoredAt: string;
        restoredBy: string;
        restoredDataTypes: string[];
        restoreId: string;
    }>;
    restoreCount?: number;
    lastRestoredAt?: string;
}

// Централизованное хранилище бэкапов
class BackupStore {
    private backups: Backup[] = [];
    private backupCounter: number = 1;

    // Генерация уникального ID для бэкапа
    generateBackupId(): string {
        return `backup_${Date.now()}_${this.backupCounter++}`;
    }

    // Получение всех бэкапов
    getAllBackups(): Backup[] {
        return [...this.backups].sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
        });
    }

    // Добавление нового бэкапа
    addBackup(backup: Omit<Backup, 'id'>): Backup {
        const newBackup: Backup = {
            ...backup,
            id: this.generateBackupId()
        };
        
        this.backups.unshift(newBackup);
        
        // Ограничение количества хранимых бэкапов
        if (this.backups.length > 20) {
            this.backups = this.backups.slice(0, 20);
        }
        
        return newBackup;
    }

    // Получение бэкапа по ID
    getBackupById(id: string): Backup | undefined {
        return this.backups.find(b => b.id === id);
    }

    // Обновление бэкапа
    updateBackup(id: string, updates: Partial<Backup>): Backup | null {
        const index = this.backups.findIndex(b => b.id === id);
        if (index === -1) return null;
        
        this.backups[index] = { ...this.backups[index], ...updates };
        return this.backups[index];
    }

    // Удаление бэкапа
    deleteBackup(id: string): Backup | null {
        const index = this.backups.findIndex(b => b.id === id);
        if (index === -1) return null;
        
        return this.backups.splice(index, 1)[0];
    }

    // Получение статистики
    getStats() {
        return {
            totalBackups: this.backups.length,
            storageUsed: this.backups.reduce((total, backup) => total + (backup.size || 0), 0),
            lastBackup: this.backups.length > 0 ? this.backups[0].createdAt : null
        };
    }

    // Очистка хранилища (для тестирования)
    clear() {
        this.backups = [];
        this.backupCounter = 1;
    }
}

// Экземпляр сервиса для использования во всех endpoint'ах
export const backupStore = new BackupStore();

// Для тестирования - добавление демо данных
export function initializeDemoBackups() {
    if (backupStore.getAllBackups().length === 0) {
        // Добавляем несколько демо бэкапов
        const demoBackups = [
            {
                description: 'Ежедневный бэкап',
                dataTypes: ['products', 'team'],
                data: {
                    products: [{ id: '1', name: 'Demo Product', type: 'desktop' }],
                    team: [{ id: '1', name: 'John Doe', role: 'Developer' }]
                },
                size: 3,
                status: 'completed',
                version: '1.0.0',
                createdAt: new Date(Date.now() - 86400000).toISOString(), // Вчера
                createdBy: 'admin'
            },
            {
                description: 'Бэкап перед обновлением',
                dataTypes: ['navigation', 'settings'],
                data: {
                    navigation: [{ id: '1', label: 'Home', path: '/' }],
                    settings: { theme: 'light', language: 'ru' }
                },
                size: 2,
                status: 'completed',
                version: '1.0.1',
                createdAt: new Date(Date.now() - 172800000).toISOString(), // Позавчера
                createdBy: 'admin'
            }
        ];

        demoBackups.forEach(backup => {
            backupStore.addBackup(backup);
        });
    }
}