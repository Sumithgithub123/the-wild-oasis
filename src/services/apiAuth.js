import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);

  return data.user;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data: { user } = {}, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateuser({ fullName, avatar }) {
  let imgpath;

  if (
    typeof avatar === "string" &&
    (avatar.startsWith("https") || avatar === "")
  ) {
    imgpath = avatar;
  } else {
    const imgname = `${Math.random()}-${avatar.name}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(`${imgname}`, avatar);

    if (error) throw new Error(error.message);

    imgpath = `${supabaseUrl}/storage/v1/object/public/avatars/${imgname}`;
  }

  const { data: updateddata, error: updaterr } = await supabase.auth.updateUser(
    {
      data: { fullName, avatar: imgpath },
    }
  );

  if (updaterr) throw new Error(updaterr.message);

  return updateddata;
}

export async function updatepassword({ password }) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}
