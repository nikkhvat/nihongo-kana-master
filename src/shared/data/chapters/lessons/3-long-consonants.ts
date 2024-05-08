import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const longConsonants: ManuallyLesson = {
  type: "manually",
  id: "edcb6a6b-4d01-4b37-a53c-9b670f88478b",
  title: "Долгие согласные.",
  subTitle: "Долгие согласные.",
  infoTitle: "Информация",
  infoSubTitle: "Здесь мы раскажем вам о долгих согласных",
  icon: "母音",
  category: [KanaAlphabet.Hiragana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Долгие согласные.",
      blocks: [
        {
          text: "На прошлом уроке мы говорили о долгих гласных. В японском языке согласные также могут быть долгими!",
        },
        {
          text: "Маленькая буква «tsu» (っ) перед хираганой обозначает долгие (или удвоенные) согласные. Сама «tsu» (っ) не произносится.",
        },
        {
          text: "Сравни ниже слова с обычной «tsu» (つ) и маленькой «tsu» (っ).",
        },
        {
          rules: [
            "かた (kata) - плечо",
            "かつた (katsuta) - имя",
            "かった (katta) - выиграл",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Сопоставь хирагану с романдзи.",
      blocks: [
        {
          pairs: [
            ["かった", "kitte (марка)"],
            ["にっき", "katta (выиграл)"],
            ["きって", "nikki (дневник)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Исключение!",
      blocks: [
        {
          text: "Маленькую «tsu» (っ) нельзя использовать перед буквами хираганы **な** (na), **に** (ni), **ぬ** (nu), **ね** (ne) и **の** (no). Для обозначения долготы этих согласных добавляется **ん** (n).",
        },
        {
          rules: [
            "ごめんなさい (gomennasai) - извини",
            "おんな (onna) - женщина",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери хирагану для kanna (плоскогубцы).",
      blocks: [
        {
          sequence: ["ん", "に", "か", "な", "ち", "っ"],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Запомни!",
      blocks: [
        {
          text: "«Здравствуйте» пишется как こんにちは (konnichiwa). Последней буквой является **は** (ha), а не **わ** (wa), потому что раньше это выражение было длиннее и в нем употреблялась частица подлежащего **は** (ha). Длинное приветствие было сокращено, но написание «wa» в качестве частицы подлежащего **は** (ha) осталось.",
        },
        {
          text: "Как ты, наверное, помнишь, частица подлежащего, всегда пишется как **は** (ha), но произносится как «wa».",
        },
        {
          rules: [
            "こんにちは (konnichiwa) - здравствуйте",
            "こんばんは (konbanwa) - добрый вечер",
          ],
        },
      ],
    },
  ],
};
