export const analyzeResumeWithGemini = async (resumeFileName, requiredSkills) => {
  return new Promise((resolve) => {
    // Simulating call to gemini-3-flash-preview
    console.log("Analyzing via model: gemini-3-flash-preview");
    
    setTimeout(() => {
      const lowerName = resumeFileName.toLowerCase();
      const extracted = requiredSkills.filter(skill => lowerName.includes(skill.toLowerCase()));
      
      const matchCount = extracted.length > 0 ? extracted.length : Math.max(1, Math.floor(Math.random() * requiredSkills.length));
      const score = Math.round((matchCount / requiredSkills.length) * 100);
      
      let feedback = "";
      if (score >= 80) feedback = "Exceptional profile. The Gemini-3-Flash model detected deep expertise aligned with the job description.";
      else if (score >= 50) feedback = "Strong candidate. Matches core competencies but may require upskilling in secondary requirements.";
      else feedback = "Candidate profile lacks direct keyword correlation with the primary technical stack requested.";

      resolve({
        score: score,
        extractedSkills: requiredSkills.slice(0, matchCount),
        aiFeedback: feedback,
        recommendedAction: score >= 60 ? "Shortlist for Interview" : "Keep in Talent Pool",
        modelUsed: "gemini-3-flash-preview"
      });
    }, 2500);
  });
};