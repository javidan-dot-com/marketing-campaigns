CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS payouts (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES campaigns(id),
    country VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL
);

ALTER TABLE payouts ADD UNIQUE (campaign_id, country);

INSERT INTO campaigns (title, url, status) VALUES
('Campaign 1', 'http://campaign.com/1', FALSE),
('Campaign 2', 'http://campaign.com/2', FALSE);

INSERT INTO payouts (campaign_id, country, amount) VALUES
(1, 'USA', 100.00),
(1, 'Canada', 150.00),
(2, 'UK', 200.00);