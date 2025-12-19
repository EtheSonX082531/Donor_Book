<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('blood_group', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
            $table->string('location');
            $table->boolean('is_donor')->default(true);
            $table->text('bio')->nullable();
            $table->date('last_donation_date')->nullable();
            $table->timestamps();
            
            // Index for faster searches
            $table->index('blood_group');
            $table->index('location');
            $table->index('is_donor');
        });
    }

    public function down()
    {
        Schema::dropIfExists('profiles');
    }
};