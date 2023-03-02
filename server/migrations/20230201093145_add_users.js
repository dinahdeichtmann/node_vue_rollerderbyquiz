exports.up = function (knex) {
  return knex.schema
    .createTable("theme", (table) => {
      table.increments("id").unsigned().primary();
      table.string("theme_number").unique().notNullable();
      table.integer("theme_parent_id");
      table.string("theme_name").notNull();
    })
    .createTable("rule", (table) => {
      table.increments("id").unsigned().primary();
      table.integer("theme_id").notNullable();
      table.integer("year");
      table.text("description");
      table.text("link_casebook");
    })
    .createTable("question", (table) => {
      table.increments("id").unsigned().primary();
      table.text("text").notNullable();
      table.integer("theme_id").notNullable();
      table.text("image");
      table.text("video");
      table.integer("rule_id").notNullable();
      table.text("raisonnement");
      table.text("remarque");
      table.text("theme_parent_id").notNullable();
    })
    .createTable("choice", (table) => {
      table.increments("id").unsigned().primary();
      table.integer("question_id").notNullable();
      table.text("answer");
      table.float("points");
      table.boolean("iscorrect");
    })
    .createTable("users", (table) => {
      table.increments("id").unsigned().primary();
      table.text("username", 20).notNullable().unique();
      table.text("email").notNullable().unique();
      table.text("team", 50);
      table.text("picture");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.text("color_app");
      table.integer("quiz_id");
    })
    .createTable("quiz", (table) => {
      table.increments("id").unsigned().primary();
      table.integer("user_id");
      table.integer("score");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.integer("question_id");
      table.integer("choice_id");
      table.integer("rule_id");
      table.boolean("isminimumquiz");
    });
  /*
      .createTable("pictures", (table) => {
        table.increments("id").unsigned().primary();
        table
          .integer("user_id")
          .references("id")
          .inTable("users")
          .notNull()
          .onDelete("cascade");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.string("path").notNull();
      });
      */
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("theme")
    .dropTable("rule")
    .dropTable("question")
    .dropTable("choice")
    .droptable("users");
};
