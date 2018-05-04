import { Project } from '../project';
import { Target } from '../manifest';
import { pathExists, copyFile, unixJoin } from '../utils';
import { targetRestoreFailed } from '../errors';

export default async function restoreTarget(project: Project, target: Target) {
  const backup = unixJoin(project.paths.backup, target.filename);
  const file = unixJoin(project.paths.build, target.filename);

  if (!(await pathExists(backup))) return;

  try {
    await copyFile(backup, file);
  } catch (err) {
    throw targetRestoreFailed(backup, file, err);
  }
}