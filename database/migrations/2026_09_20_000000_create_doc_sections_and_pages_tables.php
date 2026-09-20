<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('doc_sections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
        });

        Schema::create('doc_pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')->constrained('doc_sections')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug');
            $table->longText('content');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('published')->default(true);
            $table->timestamps();
            $table->unique(['section_id', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('doc_pages');
        Schema::dropIfExists('doc_sections');
    }
};
