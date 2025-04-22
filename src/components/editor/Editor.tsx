"use client";

import { useEffect, useState } from "react";

import {
  $getRoot,
  ParagraphNode,
  SerializedEditorState,
  TextNode,
} from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";

import { TooltipProvider } from "@/components/ui/tooltip";

import { editorTheme } from "@/components/editor/themes/editor-theme";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";

import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";

import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin";
import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin";
import { FontBackgroundToolbarPlugin } from "@/components/editor/plugins/toolbar/font-background-toolbar-plugin";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

export default function Editor({
  value,
  onHtmlChange,
  onTextChange,
}: {
  value?: SerializedEditorState;
  onHtmlChange?: (html: string) => void;
  onTextChange?: (text: string) => void;
}) {
  return (
    <div className="w-full h-full overflow-hidden rounded-lg border bg-background shadow">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editorState: (editor) => {
            if (typeof value === "string") {
              const parser = new DOMParser();
              const dom = parser.parseFromString(value, "text/html");
              const nodes = $generateNodesFromDOM(editor, dom);
              $getRoot().clear();
              $getRoot().append(...nodes);
            }
          },
        }}
      >
        <TooltipProvider>
          <Plugins />
          {onHtmlChange && <HTMLChangePlugin onHtmlChange={onHtmlChange} />}
          {onTextChange && <PlainTextPlugin onTextChange={onTextChange} />}
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

function HTMLChangePlugin({
  onHtmlChange,
}: {
  onHtmlChange: (html: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor);
        onHtmlChange(html);
      });
    });
  }, [editor]);

  return null;
}

function PlainTextPlugin({
  onTextChange,
}: {
  onTextChange: (text: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const text = $getRoot().getTextContent();
        onTextChange(text);
      });
    });
  }, [editor]);

  return null;
}

const placeholder = "Start typing...";

export function Plugins() {
  const [_floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {({}) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <BlockFormatDropDown>
              <FormatParagraph />
              <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList />
              <FormatQuote />
            </BlockFormatDropDown>
            <HistoryToolbarPlugin />
            <FontFamilyToolbarPlugin />
            <FontSizeToolbarPlugin />
            <FontColorToolbarPlugin />
            <FontBackgroundToolbarPlugin />
            <FontFormatToolbarPlugin format="bold" />
            <FontFormatToolbarPlugin format="italic" />
            <FontFormatToolbarPlugin format="underline" />
            <FontFormatToolbarPlugin format="strikethrough" />
          </div>
        )}
      </ToolbarPlugin>

      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable
                  placeholder={placeholder}
                  className="ContentEditable__root relative block overflow-auto px-8 py-4 focus:outline-none h-120"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <CheckListPlugin />
        {/* rest of the plugins */}
      </div>
    </div>
  );
}
