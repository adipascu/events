import { onCleanup, onMount } from "solid-js";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { schema } from "prosemirror-schema-basic";
import {
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import { buildMenuItems, exampleSetup } from "prosemirror-example-setup";
import "prosemirror-menu/style/menu.css";

// The component to create and display the ProseMirror editor
const ProseMirrorEditor = ({ children }: { children: string }) => {
  const div = (
    <div
      style="border: 1px solid #ddd; padding: 10px;"
			class="[&_.ProseMirror]:min-h-48 [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none"
    ></div>
  ) as HTMLDivElement;

  const textArea = (
    <textarea
      id="description"
      name="description"
      required
      class="w-full border-gray-300 rounded-md shadow-sm min-h-48"
    >
      {children}
    </textarea>
  ) as HTMLTextAreaElement;

  onMount(() => {
    delete schema.nodes.image;
    delete schema.nodes.blockquote;
    delete schema.nodes.code_block;
    delete schema.nodes.paragraph;
    delete schema.nodes.horizontal_rule;
    delete schema.nodes.heading;
    delete schema.marks.code;
    delete schema.marks.link;
    const plugins = exampleSetup({
      schema,
      menuContent: buildMenuItems(schema).inlineMenu,
    });
    const state = EditorState.create({
      schema,
      plugins,
      doc: defaultMarkdownParser.parse(textArea.textContent ?? ""),
    });

    const view = new EditorView(div, {
      state,
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        const markdown = defaultMarkdownSerializer.serialize(newState.doc);
        textArea.innerText = markdown;
      },
    });

    div.classList.remove("hidden")
    textArea.classList.add("hidden");

    onCleanup(() => {
      view.destroy();
    });
  });

  return (
    <>
      {div}
      {textArea}
    </>
  );
};

export default ProseMirrorEditor;
