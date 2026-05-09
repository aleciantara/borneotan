import {
  FieldValue,
  Timestamp,
  type QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { firestore } from "@/lib/firebase-admin";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Statistic = {
  id: string;
  label: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type AdminUser = {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt?: string;
};

type BlogDoc = Omit<BlogPost, "id" | "createdAt" | "updatedAt"> & {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

type StatDoc = Omit<Statistic, "id" | "createdAt" | "updatedAt"> & {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

type ContactDoc = Omit<Contact, "id" | "createdAt"> & {
  createdAt?: Timestamp;
};

type UserDoc = Omit<AdminUser, "id" | "createdAt"> & {
  createdAt?: Timestamp;
};

const blogsCollection = firestore.collection("blogs");
const statsCollection = firestore.collection("statistics");
const contactsCollection = firestore.collection("contacts");
const usersCollection = firestore.collection("users");

function toIso(value: Timestamp | Date | string | undefined) {
  if (!value) return new Date().toISOString();
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return value;
}

function blogFromDoc(doc: QueryDocumentSnapshot<BlogDoc>): BlogPost {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    content: data.content,
    image: data.image || undefined,
    published: Boolean(data.published),
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

function statFromDoc(doc: QueryDocumentSnapshot<StatDoc>): Statistic {
  const data = doc.data();
  return {
    id: doc.id,
    label: data.label,
    value: data.value,
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

export async function listBlogs() {
  const snap = await blogsCollection.orderBy("createdAt", "desc").get();
  return snap.docs.map((doc) => blogFromDoc(doc as QueryDocumentSnapshot<BlogDoc>));
}

export async function listPublishedBlogs() {
  const snap = await blogsCollection
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .get();
  return snap.docs.map((doc) => blogFromDoc(doc as QueryDocumentSnapshot<BlogDoc>));
}

export async function listLatestPublishedBlogs(limit: number) {
  const snap = await blogsCollection
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((doc) => blogFromDoc(doc as QueryDocumentSnapshot<BlogDoc>));
}

export async function getBlogById(id: string) {
  const doc = await blogsCollection.doc(id).get();
  if (!doc.exists) return null;
  return blogFromDoc(doc as QueryDocumentSnapshot<BlogDoc>);
}

export async function getBlogBySlug(slug: string) {
  const snap = await blogsCollection.where("slug", "==", slug).limit(1).get();
  if (snap.empty) return null;
  return blogFromDoc(snap.docs[0] as QueryDocumentSnapshot<BlogDoc>);
}

export async function createBlog(
  input: Omit<BlogPost, "id" | "createdAt" | "updatedAt">,
) {
  const now = FieldValue.serverTimestamp();
  const ref = await blogsCollection.add({
    ...input,
    image: input.image || "",
    createdAt: now,
    updatedAt: now,
  });
  return getBlogById(ref.id);
}

export async function updateBlog(
  id: string,
  input: Partial<Omit<BlogPost, "id" | "createdAt" | "updatedAt">>,
) {
  const ref = blogsCollection.doc(id);
  const existing = await ref.get();
  if (!existing.exists) return null;
  await ref.update({
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  });
  return getBlogById(id);
}

export async function deleteBlog(id: string) {
  const ref = blogsCollection.doc(id);
  const existing = await ref.get();
  if (!existing.exists) return false;
  await ref.delete();
  return true;
}

export async function listStats() {
  const snap = await statsCollection.orderBy("createdAt", "asc").get();
  return snap.docs.map((doc) => statFromDoc(doc as QueryDocumentSnapshot<StatDoc>));
}

export async function listLatestStats(limit: number) {
  const snap = await statsCollection
    .orderBy("createdAt", "asc")
    .limit(limit)
    .get();
  return snap.docs.map((doc) => statFromDoc(doc as QueryDocumentSnapshot<StatDoc>));
}

export async function countBlogs() {
  return (await blogsCollection.count().get()).data().count;
}

export async function countStats() {
  return (await statsCollection.count().get()).data().count;
}

export async function createStat(input: Omit<Statistic, "id" | "createdAt" | "updatedAt">) {
  const now = FieldValue.serverTimestamp();
  const ref = await statsCollection.add({
    ...input,
    createdAt: now,
    updatedAt: now,
  });
  const doc = await statsCollection.doc(ref.id).get();
  if (!doc.exists) return null;
  return statFromDoc(doc as QueryDocumentSnapshot<StatDoc>);
}

export async function updateStat(
  id: string,
  input: Partial<Omit<Statistic, "id" | "createdAt" | "updatedAt">>,
) {
  const ref = statsCollection.doc(id);
  const existing = await ref.get();
  if (!existing.exists) return null;
  await ref.update({
    ...input,
    updatedAt: FieldValue.serverTimestamp(),
  });
  const doc = await ref.get();
  return statFromDoc(doc as QueryDocumentSnapshot<StatDoc>);
}

export async function deleteStat(id: string) {
  const ref = statsCollection.doc(id);
  const existing = await ref.get();
  if (!existing.exists) return false;
  await ref.delete();
  return true;
}

export async function createContact(input: Omit<Contact, "id" | "createdAt">) {
  const ref = await contactsCollection.add({
    ...input,
    createdAt: FieldValue.serverTimestamp(),
  });
  const doc = await ref.get();
  const data = doc.data() as ContactDoc | undefined;
  return {
    id: doc.id,
    name: data?.name || input.name,
    email: data?.email || input.email,
    message: data?.message || input.message,
    createdAt: toIso(data?.createdAt),
  };
}

export async function getUserByEmail(email: string) {
  const snap = await usersCollection.where("email", "==", email).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  const data = doc.data() as UserDoc;
  return {
    id: doc.id,
    email: data.email,
    password: data.password,
    role: data.role || "admin",
    createdAt: toIso(data.createdAt),
  } satisfies AdminUser;
}
