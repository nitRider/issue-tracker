import { Priority, Status, Tags, Type } from 'src/app/models/project.model';

export const ISSUETYPES: Type[] = [
  { name: 'BUG', id: 1 },
  { name: 'TASK', id: 2 },
  { name: 'STORY', id: 3 }
];

export const ISSUESPRIORITY: Priority[] = [
  { name: 'LOW', id: 1 },
  { name: 'MEDIUM', id: 2 },
  { name: 'HIGH', id: 3 }
];

export const ISSUETAGS: Tags[] = [
  { name: 'HU-22', id: 1 },
  { name: 'Angular track', id: 2 },
  { name: 'Java track', id: 3 },
  { name: 'Python track', id: 4 }
];

export const ISSUESSTATUS: Status[] = [
  { name: 'To-Do', id: 1 },
  { name: 'Development', id: 2 },
  { name: 'Testing', id: 3 },
  { name: 'Completed', id: 4 }
];

export const SPRINTS: string[] = [
  'Sprint 21',
  'Sprint 22',
  'Sprint 23',
  'Sprint 24',
  'Sprint 25'
];
