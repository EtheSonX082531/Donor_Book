<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['request', 'donor', 'general']);
            $table->enum('blood_group', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
            $table->integer('units_needed')->nullable();
            $table->string('hospital_name')->nullable();
            $table->string('location');
            $table->enum('urgency', ['low', 'medium', 'high', 'critical'])->default('medium');
            $table->text('description');
            $table->integer('likes_count')->default(0);
            $table->integer('comments_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Indexes for search optimization
            $table->index('type');
            $table->index('blood_group');
            $table->index('location');
            $table->index('urgency');
            $table->index('is_active');
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
};