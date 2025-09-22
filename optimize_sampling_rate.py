import json

# Define sampling rates to test
sampling_rates = [1, 5, 10, 20, 50]

# Store results
results = []

# Simulate system evaluation
def evaluate(rate):
    # Higher rate increases load, improves accuracy
    load = rate * 2  # simple load calculation
    accuracy = 100 - abs(20 - rate) * 2
    return load, accuracy

# Test each rate
for rate in sampling_rates:
    load, accuracy = evaluate(rate)
    results.append({"rate": rate, "load": load, "accuracy": accuracy})
    print(f"Rate {rate}: Load={load}%, Accuracy={accuracy}%")

# Pick best rate under load limit
load_limit = 80
best = None
for r in results:
    if r["load"] <= load_limit:
        if not best or r["accuracy"] > best["accuracy"]:
            best = r

print("\nOptimal rate found:", best)

# Save to configuration
with open("sampling_config.json", "w") as f:
    json.dump({"sampling_rate": best["rate"]}, f)

print("Configuration saved.")
