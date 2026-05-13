const STORAGE_KEY = "activities";

export const getActivities = () => {
  const activities = localStorage.getItem(STORAGE_KEY);

  return activities ? JSON.parse(activities) : [];
};

export const addActivity = (
  action: string,
  user: string
) => {
  const activities = getActivities();

  const newActivity = {
    id: Date.now(),
    action,
    user,
    date: new Date().toLocaleString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newActivity, ...activities])
  );
};