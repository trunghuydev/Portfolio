
export type Skill = {
  skill_id: string;
  skill_name: string;
  position: string;
};

export type SkillGroup = {
  position: string;
  skills: Skill[];
  color: string;
};
export const groupSkillsByPosition = (skills: Skill[]): SkillGroup[] => {
  const colorPalette = [
    'text-blue-500',
    'text-green-500',
    'text-purple-500',
    'text-red-500',
    'text-yellow-500',
    'text-pink-500',
  ];

  const map = new Map<string, SkillGroup>();

  skills.forEach((skill) => {
    const position = skill.position.trim();

    if (!map.has(position)) {
      map.set(position, {
        position,
        skills: [],
        color: colorPalette[map.size % colorPalette.length],
      });
    }

    const group = map.get(position)!;
    group.skills.push(skill); 
  });

  return Array.from(map.values());
};
