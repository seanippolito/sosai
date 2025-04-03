CREATE TABLE IF NOT EXISTS "chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "title" text NOT NULL,
    "visibility" varchar DEFAULT 'private' NOT NULL,
    "userId" uuid references auth.users not null,
	"createdAt" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "suggestion" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"documentId" uuid NOT NULL,
	"documentCreatedAt" timestamp NOT NULL,
	"originalText" text NOT NULL,
	"suggestedText" text NOT NULL,
	"description" text,
	"isResolved" boolean DEFAULT false NOT NULL,
    "userId" uuid references auth.users not null,
	"createdAt" timestamp NOT NULL,
	CONSTRAINT "Suggestion_id_pk" PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "document" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text,
    "kind" varchar DEFAULT 'text' NOT NULL,
    "userId" uuid references auth.users not null,
    "createdAt" timestamp NOT NULL,
	CONSTRAINT "Document_id_createdAt_pk" PRIMARY KEY("id","createdAt")
);

CREATE TABLE IF NOT EXISTS "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chatId" uuid NOT NULL,
	"role" varchar NOT NULL,
	"parts" json NOT NULL,
	"attachments" json NOT NULL,
	"createdAt" timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS "vote" (
	"chatId" uuid NOT NULL,
	"messageId" uuid NOT NULL,
	"isUpvoted" boolean NOT NULL,
	CONSTRAINT "Vote_chatId_messageId_pk" PRIMARY KEY("chatId","messageId")
);

ALTER TABLE "suggestion" 
ADD CONSTRAINT "suggestion_documentId_documentCreatedAt_document_id_createdAt_fk" 
FOREIGN KEY ("documentId","documentCreatedAt") 
REFERENCES "public"."document"("id","createdAt") 
ON DELETE cascade 
ON UPDATE cascade
NOT DEFERRABLE;

ALTER TABLE "message" 
ADD CONSTRAINT "message_chatId_chat_id_fk" 
FOREIGN KEY ("chatId") 
REFERENCES "public"."chat"("id") 
ON DELETE cascade 
ON UPDATE cascade
NOT DEFERRABLE;

ALTER TABLE "vote" 
ADD CONSTRAINT "vote_chatId_chat_id_fk" 
FOREIGN KEY ("chatId") 
REFERENCES "public"."chat"("id") 
ON DELETE cascade 
ON UPDATE cascade
NOT DEFERRABLE;

ALTER TABLE "vote" 
ADD CONSTRAINT "vote_messageId_message_id_fk" 
FOREIGN KEY ("messageId") 
REFERENCES "public"."message"("id") 
ON DELETE cascade 
ON UPDATE cascade
NOT DEFERRABLE;