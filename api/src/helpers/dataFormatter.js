export const formatCategoryData = (data) => ({
  id: data._id,
  name: data.name,
});

export const formatMenuItemData = (data) => ({
  id: data._id,
  name: data.name,
});

export const formatUserData = (data) => ({
  id: data._id,
  address: data.address,
  createdAt: data.createdAt,
  email: data.email,
  name: data.name,
  phone: data.phone ?? null,
  profileImageUrl: data.profileImageUrl ?? null,
  roles: data.roles,
});
