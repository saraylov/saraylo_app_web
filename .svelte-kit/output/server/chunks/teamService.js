import { f as formatDate, g as generateId } from "./utils2.js";
let teamMembersStore = [
  {
    id: "tm1",
    name: "Алексей Петров",
    role: "Frontend Developer",
    bio: "Опытный разработчик с 5-летним стажем в веб-разработке. Специализируется на React и Vue.js.",
    skills: ["JavaScript", "TypeScript", "React", "Vue.js", "CSS"],
    avatar: "/images/team/alexey.jpg",
    createdAt: formatDate(/* @__PURE__ */ new Date("2023-01-15")),
    updatedAt: formatDate(/* @__PURE__ */ new Date("2023-01-15"))
  },
  {
    id: "tm2",
    name: "Мария Иванова",
    role: "Backend Developer",
    bio: "Эксперт в области backend-разработки. Работает с Node.js, Python и базами данных.",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker"],
    avatar: "/images/team/maria.jpg",
    createdAt: formatDate(/* @__PURE__ */ new Date("2023-02-20")),
    updatedAt: formatDate(/* @__PURE__ */ new Date("2023-02-20"))
  },
  {
    id: "tm3",
    name: "Дмитрий Сидоров",
    role: "UI/UX Designer",
    bio: "Креативный дизайнер с опытом создания интерфейсов для веб и мобильных приложений.",
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Prototyping"],
    avatar: "/images/team/dmitry.jpg",
    createdAt: formatDate(/* @__PURE__ */ new Date("2023-03-10")),
    updatedAt: formatDate(/* @__PURE__ */ new Date("2023-03-10"))
  }
];
async function getAllTeamMembers(limit, offset) {
  let members = [...teamMembersStore];
  if (limit) {
    const startIndex = offset || 0;
    members = members.slice(startIndex, startIndex + limit);
  }
  return members;
}
async function getTeamMemberById(id) {
  const member = teamMembersStore.find((m) => m.id === id);
  return member || null;
}
async function createTeamMember(data) {
  const newMember = {
    id: generateId(),
    ...data,
    createdAt: formatDate(/* @__PURE__ */ new Date()),
    updatedAt: formatDate(/* @__PURE__ */ new Date())
  };
  teamMembersStore.push(newMember);
  return newMember;
}
async function deleteTeamMember(id) {
  const index = teamMembersStore.findIndex((m) => m.id === id);
  if (index === -1) {
    return false;
  }
  teamMembersStore.splice(index, 1);
  return true;
}
async function getTeamMemberCount() {
  return teamMembersStore.length;
}
export {
  getTeamMemberCount as a,
  getTeamMemberById as b,
  createTeamMember as c,
  deleteTeamMember as d,
  getAllTeamMembers as g
};
