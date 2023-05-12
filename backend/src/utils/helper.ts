export const aggregatorMap: Record<string, string> = {
  ['fluid_intake_observation']: 'consumed_volume_ml',
  ['catheter_observation']: 'consumed_volume_ml',
  ['check_in']: 'count',
  ['regular_medication_taken']: 'count',
  ['mood_observation']: 'categorical_mood',
};

export const categoricalMood: Record<string, number> = {
  ['happy']: 1,
  ['okay']: 0,
  ['sad']: -1,
};
