import { join } from 'path';
import { homedir } from 'os';
import { Registration } from './manager';

/**
 * Keep track of absolute paths to various resources and package resolution
 * 
 * Currently hardcoded, but I imagine an .rc or .config.js approach in the future
 */

export interface Config {
  /**
   * cwd for processing
   */
  cwd: string;

  /**
   * absolute path to build directory
   * (build contains binary output of build process)
   */
  build: string;

  /**
   * absolute path to scripts directory
   * (contains applescript and vbs)
   */
  scripts: string;

  /**
   * absolute path to addins directory
   */
  addins: string;

  /**
   * absolute path to cache directory
   * (default is .vba-blocks in home directory)
   */
  cache: string;

  /**
   * absolute path to local registry
   * and url for git remote
   */
  registry: { local: string; remote: string };

  /**
   * resolve package from remote source
   * (default is packages.vba-blocks.com/...)
   */
  resolveRemotePackage: (registration: Registration) => string;

  /**
   * resolve package locally
   * (default is in {cache}/packages/...)
   */
  resolveLocalPackage: (registration: Registration) => string;

  /**
   * resolve expanded package ("source")
   * (default is in {cache}/sources/...)
   */
  resolveSource: (registration: Registration) => string;
}

export async function loadConfig(): Promise<Config> {
  const cwd = process.cwd();
  const build = join(cwd, 'build');
  const scripts = join(__dirname, '../scripts');
  const addins = join(__dirname, '../../addin/build');
  const cache = join(homedir(), '.vba-blocks');
  const registry = {
    local: join(cache, 'registry'),
    remote: 'https://github.com/vba-blocks/registry.git'
  };

  const resolveRemotePackage = registration =>
    `https://packages.vba-blocks.com/${registration.name}/v${registration.version}.tar.gz`;
  const resolveLocalPackage = registration =>
    join(
      cache,
      `packages/${registration.name}/v${registration.version}.tar.gz`
    );
  const resolveSource = registration =>
    join(cache, `sources/${registration.name}/v${registration.version}`);

  const config: Config = {
    cwd,
    build,
    scripts,
    addins,
    cache,
    registry,
    resolveRemotePackage,
    resolveLocalPackage,
    resolveSource
  };

  return config;
}
