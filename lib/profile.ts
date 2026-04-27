export type ClinicProfile = {
  clinicName: string;
  category: string;
  city: string;
  avgTicket: number;
};

export const defaultProfile: ClinicProfile = {
  clinicName: "",
  category: "",
  city: "",
  avgTicket: 700,
};

export function profileKey(userId: string) {
  return `qp_clinic_profile_${userId}`;
}

export function loadClinicProfile(userId: string): ClinicProfile {
  if (typeof window === "undefined") return defaultProfile;

  try {
    return {
      ...defaultProfile,
      ...JSON.parse(localStorage.getItem(profileKey(userId)) || "{}"),
    };
  } catch {
    return defaultProfile;
  }
}

export function saveClinicProfile(userId: string, profile: ClinicProfile) {
  localStorage.setItem(profileKey(userId), JSON.stringify(profile));
}
