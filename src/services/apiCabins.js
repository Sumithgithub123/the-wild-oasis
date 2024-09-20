import { CABIN_PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins({ pageParam = 0 }) {
  const from = pageParam * (CABIN_PAGE_SIZE - 1) + pageParam;
  const to = from + (CABIN_PAGE_SIZE - 1);

  // console.log(from, to);

  const { data, error, count } = await supabase
    .from("cabins")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    console.error(error);
    throw new Error("Cabins not loaded");
  }

  return { data, count };
}

export async function deleteCabin(id) {
  const { data: se, error: seerr } = await supabase
    .from("cabins")
    .select()
    .eq("id", id);

  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  // const imagename = se[0].image.split("/").slice(-1);

  // await supabase.storage.from("cabin-images").remove([`${imagename}`]);

  return data;
}

export async function inserteditCabin(insertdata, id) {
  const stringornot = typeof insertdata.image === "string";
  const imagenotedited = stringornot
    ? insertdata.image.startsWith(`${supabaseUrl}`)
    : false;

  const imagename = `${Math.random()}-${insertdata.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagepath = imagenotedited
    ? insertdata.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imagename}`;

  const query = supabase.from("cabins");

  if (!id) {
    const { data, error } = await query
      .insert([{ ...insertdata, image: imagepath }])
      .select();

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    if (!imagenotedited) {
      const { error: storageerror } = await supabase.storage
        .from("cabin-images")
        .upload(imagename, insertdata.image);

      if (storageerror) {
        await query.delete().eq("id", data.id);
        throw new Error(storageerror.message);
      }
    }

    return data;
  }

  if (id) {
    console.log("updating...");
    console.log(imagepath);
    const { data, error } = await query
      .update({ ...insertdata, image: imagepath })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    if (!imagenotedited) {
      const { error: storageerror } = await supabase.storage
        .from("cabin-images")
        .upload(imagename, insertdata.image);

      if (storageerror) {
        await query.delete().eq("id", data.id);
        throw new Error(storageerror.message);
      }
    }

    return data;
  }
}
