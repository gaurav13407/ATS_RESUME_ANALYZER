def calculate_ats_score(skill_match_percentage:float)->dict:
    ats_score=round(skill_match_percentage,2)

    return {
            "ats_score":ats_score,
            "breakdown":{
                "skill_match_percentage":skill_match_percentage,
                "weight":"100%"
                }
            }
