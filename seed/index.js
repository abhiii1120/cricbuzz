import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import User from "../src/model/user.model.js";
import Team from "../src/model/team.model.js";
import Series from "../src/model/series.model.js";
import Match from "../src/model/match.model.js";
import Score from "../src/model/score.model.js";
import Commentary from "../src/model/commentary.model.js";
import Player from "../src/model/player.model.js";

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/cricbuzz";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...");

    // Clear existing data
    await Team.deleteMany({});
    await Series.deleteMany({});
    await Match.deleteMany({});
    await Score.deleteMany({});
    await Commentary.deleteMany({});
    await Player.deleteMany({});
    console.log("Cleared existing data.");

    // 1. Users — find or create the admin
    let admin = await User.findOne({ email: "abhinaymhatre1234@gmail.com" });

    if (admin) {
      admin.role = "SUPER_ADMIN";
      await admin.save();
      console.log(`${admin.email} promoted to SUPER_ADMIN`);
    } else {
      // Your User model has no pre-save hook to hash the password,
      // so we hash it here manually (bcrypt.compare is used in
      // userSchema.methods.comparePassword).
      const hashedPassword = await bcrypt.hash("ChangeMe123!", 10); // TODO: set a real password

      admin = await User.create({
        name: "Abhinay Mhatre",
        email: "abhinaymhatre1234@gmail.com",
        password: hashedPassword,
        role: "SUPER_ADMIN"
      });
      console.log(`${admin.email} created as SUPER_ADMIN`);
    }

    // 2. Series
    const series = await Series.create({
      name: "Border-Gavaskar Trophy 2026",
      shortName: "BGT",
      season: "2026",
      status: "LIVE",
      logo: "https://example.com/bgt-logo.png",
      createdBy: admin._id
    });
    console.log("Series seeded.");

    // 3. Players
    const indPlayersData = [
      { name: "Rohit Sharma", role: "BATSMAN", country: "India", battingStyle: "Right-hand bat", image: "https://example.com/rohit.jpg", createdBy: admin._id },
      { name: "Yashasvi Jaiswal", role: "BATSMAN", country: "India", battingStyle: "Left-hand bat", image: "https://example.com/jaiswal.jpg", createdBy: admin._id },
      { name: "Shubman Gill", role: "BATSMAN", country: "India", battingStyle: "Right-hand bat", image: "https://example.com/gill.jpg", createdBy: admin._id },
      { name: "Virat Kohli", role: "BATSMAN", country: "India", battingStyle: "Right-hand bat", image: "https://example.com/kohli.jpg", createdBy: admin._id },
      { name: "Rishabh Pant", role: "WICKET_KEEPER", country: "India", battingStyle: "Left-hand bat", image: "https://example.com/pant.jpg", createdBy: admin._id },
      { name: "KL Rahul", role: "WICKET_KEEPER", country: "India", battingStyle: "Right-hand bat", image: "https://example.com/klrahul.jpg", createdBy: admin._id },
      { name: "Ravindra Jadeja", role: "ALL_ROUNDER", country: "India", battingStyle: "Left-hand bat", bowlingStyle: "Left-arm orthodox", image: "https://example.com/jadeja.jpg", createdBy: admin._id },
      { name: "R Ashwin", role: "ALL_ROUNDER", country: "India", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm offbreak", image: "https://example.com/ashwin.jpg", createdBy: admin._id },
      { name: "Jasprit Bumrah", role: "BOWLER", country: "India", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm fast", image: "https://example.com/bumrah.jpg", createdBy: admin._id },
      { name: "Mohammed Siraj", role: "BOWLER", country: "India", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm fast", image: "https://example.com/siraj.jpg", createdBy: admin._id },
      { name: "Akash Deep", role: "BOWLER", country: "India", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm medium-fast", image: "https://example.com/akash.jpg", createdBy: admin._id }
    ];

    const ausPlayersData = [
      { name: "Usman Khawaja", role: "BATSMAN", country: "Australia", battingStyle: "Left-hand bat", image: "https://static-files.cricket-australia.pulselive.com/headshots/288/287-camedia.png", createdBy: admin._id },
      { name: "Steve Smith", role: "BATSMAN", country: "Australia", battingStyle: "Right-hand bat", image: "https://static-files.cricket-australia.pulselive.com/headshots/288/1075-camedia.png", createdBy: admin._id },
      { name: "Marnus Labuschagne", role: "BATSMAN", country: "Australia", battingStyle: "Right-hand bat", image: "https://static-files.cricket-australia.pulselive.com/headshots/288/348-bbl.png", createdBy: admin._id },
      { name: "Travis Head", role: "BATSMAN", country: "Australia", battingStyle: "Left-hand bat", image: "https://example.com/head.jpg", createdBy: admin._id },
      { name: "Cameron Green", role: "ALL_ROUNDER", country: "Australia", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm fast-medium", image: "https://example.com/green.jpg", createdBy: admin._id },
      { name: "Mitchell Marsh", role: "ALL_ROUNDER", country: "Australia", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm medium", image: "https://example.com/marsh.jpg", createdBy: admin._id },
      { name: "Alex Carey", role: "WICKET_KEEPER", country: "Australia", battingStyle: "Left-hand bat", image: "https://example.com/carey.jpg", createdBy: admin._id },
      { name: "Pat Cummins", role: "BOWLER", country: "Australia", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm fast", image: "https://example.com/cummins.jpg", createdBy: admin._id },
      { name: "Mitchell Starc", role: "BOWLER", country: "Australia", battingStyle: "Left-hand bat", bowlingStyle: "Left-arm fast", image: "https://example.com/starc.jpg", createdBy: admin._id },
      { name: "Nathan Lyon", role: "BOWLER", country: "Australia", battingStyle: "Right-hand bat", bowlingStyle: "Right-arm offbreak", image: "https://example.com/lyon.jpg", createdBy: admin._id },
      { name: "Josh Hazlewood", role: "BOWLER", country: "Australia", battingStyle: "Left-hand bat", bowlingStyle: "Right-arm fast-medium", image: "https://example.com/hazlewood.jpg", createdBy: admin._id }
    ];

    const indPlayers = await Player.insertMany(indPlayersData);
    const ausPlayers = await Player.insertMany(ausPlayersData);
    console.log("Players seeded.");

    // 4. Teams
    const indTeam = await Team.create({
      name: "India National Cricket Team",
      shortName: "IND",
      logo: "https://example.com/ind-logo.png",
      primaryColor: "#0000FF",
      squadPlayers: indPlayers.map(p => p._id),
      createdBy: admin._id
    });

    const ausTeam = await Team.create({
      name: "Australia National Cricket Team",
      shortName: "AUS",
      logo: "https://example.com/aus-logo.png",
      primaryColor: "#FFFF00",
      squadPlayers: ausPlayers.map(p => p._id),
      createdBy: admin._id
    });

    console.log("Teams seeded.");

    // 5. Match
    const playingXIInd = indPlayers.map((p, idx) => ({
      player: p._id,
      isCaptain: idx === 0,
      isWicketKeeper: p.role === "WICKET_KEEPER"
    }));

    const playingXIAus = ausPlayers.map((p, idx) => ({
      player: p._id,
      isCaptain: idx === 7, // Pat Cummins
      isWicketKeeper: p.role === "WICKET_KEEPER"
    }));

    const match = await Match.create({
      seriesId: series._id,
      matchNumber: "1st Test",
      venue: "Perth Stadium, Perth",
      startTime: new Date(),
      status: "LIVE",
      team1: indTeam._id,
      team2: ausTeam._id,
      tossWinner: ausTeam._id,
      tossDecision: "BAT",
      playingXI: {
        team1: playingXIInd,
        team2: playingXIAus
      },
      createdBy: admin._id
    });
    console.log("Match seeded.");

    // 6. Score
    await Score.create({
      matchId: match._id,
      innings: 1,
      battingTeam: ausTeam._id,
      score: 154,
      wickets: 3,
      overs: "45.2",
      runRate: 3.4,
      target: null, // Since it's the 1st innings
      createdBy: admin._id
    });
    console.log("Score seeded.");

    // 7. Commentary
    await Commentary.insertMany([
      {
        matchId: match._id,
        over: 45,
        ball: 1,
        text: "Bumrah to Smith, Good length, solidly defended on the front foot.",
        type: "NORMAL",
        createdBy: admin._id
      },
      {
        matchId: match._id,
        over: 45,
        ball: 2,
        text: "Bumrah to Smith, FOUR! Beautiful cover drive piercing the gap. That will reach the boundary effortlessly.",
        type: "FOUR",
        createdBy: admin._id
      }
    ]);
    console.log("Commentary seeded.");

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();