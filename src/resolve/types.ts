import { Config } from '../types';
import { Dependency } from '../manifest/types';
import { Registration } from '../sources/types';

export type DependencyGraph = Registration[];

export interface Resolver extends Iterable<ResolutionGraphEntry> {
  config: Config;
  graph: ResolutionGraph;
  loading: Map<string, Promise<Registration[]>>;
  preferred: Map<string, Registration>;

  get(dependency: Dependency): Promise<Resolution>;
  getRegistration(id: string): Registration | undefined;
  prefer(preferred: DependencyGraph): void;
}

export interface Resolution {
  name: string;
  range: string[];
  preferred?: Registration;
  registered: Registration[];
}
export type ResolutionGraph = Map<string, Resolution>;
export type ResolutionGraphEntry = [string, Resolution];