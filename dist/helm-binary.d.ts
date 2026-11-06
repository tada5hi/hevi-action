import { HelmBinary } from 'hevi';
export declare class ArchiveHelmBinary extends HelmBinary {
    execute(args: string[]): Promise<string>;
}
