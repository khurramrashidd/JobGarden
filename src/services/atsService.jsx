export function calculateScore(jobSkills, resumeText) {
  if (!jobSkills || !resumeText) return 0;

  let score = 0;

  jobSkills.forEach(skill => {
    if (resumeText.toLowerCase().includes(skill.toLowerCase())) {
      score += 1;
    }
  });

  return Math.round((score / jobSkills.length) * 100);
}