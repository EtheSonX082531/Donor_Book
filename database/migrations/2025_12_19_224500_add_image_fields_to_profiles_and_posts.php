<?php
// database/migrations/2025_12_19_224500_add_image_fields_to_profiles_and_posts.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('image')->nullable()->after('bio');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->string('image')->nullable()->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn('image');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
};
