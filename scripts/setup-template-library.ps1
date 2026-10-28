
# ORYNZA Template Library Setup
# Run from the root of the existing React/Vite project.

$ErrorActionPreference = "Stop"
$Root = (Get-Location).Path

$Base = Join-Path $Root "src\templates"
$Public = Join-Path $Root "public\templates"

# 15 categories and 10 template types per category.
$Groups = [ordered]@{
    WED = @{
        Name = "Wedding Invitations and Stationery"
        Types = @(
            "Classic Formal Wedding", "Luxury Editorial Wedding",
            "Floral Garden Wedding", "Minimal Modern Wedding",
            "Traditional Indian Wedding", "South Indian Traditional Wedding",
            "Destination Wedding", "Rustic Countryside Wedding",
            "Watercolour Wedding", "Wedding Invitation Suite"
        )
    }
    BIR = @{
        Name = "Birthday Invitations"
        Types = @(
            "First Birthday", "Children Cartoon Party",
            "Princess Fairy Birthday", "Superhero Action Party",
            "Teen Birthday", "18th or 21st Birthday",
            "Milestone Birthday", "Elegant Adult Birthday",
            "Outdoor Pool Birthday", "Surprise Birthday"
        )
    }
    BAB = @{
        Name = "Baby Pregnancy and Family Announcements"
        Types = @(
            "Baby Shower", "Gender Reveal", "Pregnancy Announcement",
            "Birth Announcement", "Baby Naming Ceremony", "Baptism",
            "Christening", "First Month or 100 Day Celebration",
            "Welcome Home Baby", "Family Portrait Announcement"
        )
    }
    ENG = @{
        Name = "Engagements and Pre-Wedding Events"
        Types = @(
            "Engagement Ceremony", "Proposal Announcement", "Bridal Shower",
            "Bachelorette Party", "Bachelor Party", "Mehendi Ceremony",
            "Haldi Ceremony", "Sangeet Night", "Rehearsal Dinner",
            "Wedding Countdown"
        )
    }
    HOM = @{
        Name = "Housewarming and Personal Milestones"
        Types = @(
            "Housewarming", "Griha Pravesh", "New Home Announcement",
            "Wedding Anniversary", "Retirement Celebration", "Family Reunion",
            "Class Reunion", "Personal Achievement", "New Venture Announcement",
            "Farewell Gathering"
        )
    }
    COR = @{
        Name = "Corporate Events and Conferences"
        Types = @(
            "Corporate Conference", "Business Seminar", "Networking Event",
            "Product Launch Event", "Annual General Meeting",
            "Employee Recognition", "Team Building", "Investor Meeting",
            "Training Workshop", "Company Anniversary"
        )
    }
    MKT = @{
        Name = "Business Promotions and Marketing"
        Types = @(
            "Grand Opening", "Seasonal Sale", "Luxury Product Launch",
            "New Store Opening", "Limited Time Offer", "Service Launch",
            "Customer Appreciation", "Loyalty Programme",
            "Discount Coupon", "Brand Awareness Campaign"
        )
    }
    FES = @{
        Name = "Festivals and Seasonal Celebrations"
        Types = @(
            "Diwali", "Eid", "Holi", "Christmas", "New Year",
            "Onam", "Pongal", "Easter", "Thanksgiving Harvest",
            "Spring Summer Celebration"
        )
    }
    ACA = @{
        Name = "Graduation Academic and Achievement"
        Types = @(
            "Graduation Announcement", "Graduation Party",
            "Convocation", "Academic Award Ceremony", "School Reunion",
            "College Reunion", "Academic Conference", "Achievement Announcement",
            "Course Completion", "Academic Farewell"
        )
    }
    SOC = @{
        Name = "Parties Dinners and Social Gatherings"
        Types = @(
            "Dinner Party", "Cocktail Party", "Garden Party", "Pool Party",
            "Picnic", "Game Night", "Movie Night", "Karaoke Music Night",
            "Potluck Gathering", "Friends Get-Together"
        )
    }
    THK = @{
        Name = "Thank You Cards and Correspondence"
        Types = @(
            "Wedding Thank You", "Birthday Thank You", "Baby Gift Thank You",
            "Business Appreciation", "Client Thank You",
            "Teacher Appreciation", "Congratulations Card", "Friendship Card",
            "Personal Gratitude Note", "Gift Enclosure Card"
        )
    }
    MEM = @{
        Name = "Memorials and Remembrance"
        Types = @(
            "Memorial Announcement", "Prayer Meeting", "Celebration of Life",
            "Remembrance Card", "Anniversary Remembrance", "Funeral Service",
            "Memorial Photo Card", "Tribute Condolence Card",
            "Religious Remembrance", "Online Memorial Gathering"
        )
    }
    ANN = @{
        Name = "Announcements and Everyday Invitations"
        Types = @(
            "Save the Date", "Moving Announcement", "New Address Announcement",
            "Community Gathering", "Charity Fundraiser", "Volunteer Event",
            "Club Membership Invitation", "Religious Spiritual Gathering",
            "Neighbourhood Event", "Personal Life Update"
        )
    }
    PST = @{
        Name = "Posters Flyers and Digital Event Graphics"
        Types = @(
            "Concert Poster", "Music Festival Poster", "Art Exhibition Poster",
            "Photography Exhibition", "Workshop Flyer", "Webinar Poster",
            "Fitness Sports Poster", "Food Festival Flyer",
            "Community Notice", "Event Schedule Programme"
        )
    }
    DIG = @{
        Name = "Digital Greetings and Social Sharing"
        Types = @(
            "Good Morning", "Good Night", "Congratulations",
            "Best Wishes", "Friendship Greeting", "Thank You Social Card",
            "Inspirational Quote", "Holiday Greeting",
            "Milestone Announcement", "Personalised Photo Greeting"
        )
    }
}

# Eight shared colour palettes.
$Palettes = @(
    @{ id="classic-neutral"; name="Classic and Neutral"; colors=@("#FFFFFF","#F5F0E8","#D9C7A3","#8B7355","#242424") },
    @{ id="romantic-soft"; name="Romantic and Soft"; colors=@("#F8D7DA","#E8B4B8","#B76E79","#F5E6D3","#FFFFFF") },
    @{ id="royal-luxury"; name="Royal and Luxury"; colors=@("#153448","#1D5B4F","#C9A227","#F5E8C7","#722F37") },
    @{ id="pastel-playful"; name="Pastel and Playful"; colors=@("#FFC0CB","#BDE0FE","#CDB4DB","#CAFFBF","#FDFFB6") },
    @{ id="earthy-organic"; name="Earthy and Organic"; colors=@("#E2725B","#BCB88A","#556B2F","#D8C3A5","#FAF3E0") },
    @{ id="modern-corporate"; name="Modern and Corporate"; colors=@("#0F172A","#2563EB","#06B6D4","#94A3B8","#F8FAFC") },
    @{ id="vibrant-energy"; name="Vibrant and Energetic"; colors=@("#FF4D6D","#FF9F1C","#FFD60A","#00C2A8","#5A4BFF") },
    @{ id="dark-dramatic"; name="Dark and Dramatic"; colors=@("#080808","#242424","#722F37","#9B7B39","#E7D8C9") }
)

# RSVP defaults by category.
$RsvpDefaults = @{
    WED = "optional"; BIR = "optional"; BAB = "optional"
    ENG = "optional"; HOM = "optional"; COR = "yes"
    MKT = "no"; FES = "optional"; ACA = "optional"
    SOC = "optional"; THK = "no"; MEM = "no"
    ANN = "optional"; PST = "optional"; DIG = "no"
}

# Create shared directories.
$Directories = @(
    "$Base\catalog",
    "$Base\palettes",
    "$Base\customization",
    "$Base\rsvp",
    "$Base\components",
    "$Base\utils",
    "$Public\previews",
    "$Public\illustrations",
    "$Public\backgrounds",
    "$Public\fonts"
)

foreach ($Directory in $Directories) {
    New-Item -ItemType Directory -Path $Directory -Force | Out-Null
}

$Catalog = @()
$Total = 0

foreach ($Prefix in $Groups.Keys) {
    $Group = $Groups[$Prefix]
    $GroupDirectory = Join-Path "$Base\categories" $Prefix

    New-Item -ItemType Directory -Path $GroupDirectory -Force | Out-Null

    for ($i = 0; $i -lt 10; $i++) {
        $Number = $i + 1
        $Id = "{0}-{1:D3}" -f $Prefix, $Number
        $Name = $Group.Types[$i]
        $Folder = Join-Path $GroupDirectory $Id

        New-Item -ItemType Directory -Path $Folder -Force | Out-Null

        $Rsvp = $RsvpDefaults[$Prefix]

        # The first template.json contains the configuration schema.
        $Config = [ordered]@{
            id = $Id
            name = $Name
            category = $Prefix
            categoryName = $Group.Name
            description = ""
            status = "draft"
            version = "1.0.0"
            style = "modern"
            paletteIds = @($Palettes | ForEach-Object { $_.id })
            defaultPalette = "classic-neutral"
            customColors = $true
            editableFields = @(
                "title", "subtitle", "date", "time",
                "venue", "message", "contact"
            )
            customization = @{
                typography = $true
                background = $true
                decorativeElements = $true
                imageUpload = $false
                layoutVariants = @("portrait", "square", "landscape")
                qrCode = $false
                logo = $false
            }
            rsvp = @{
                default = $Rsvp
                enabled = ($Rsvp -ne "no")
                options = @("attending", "not-attending", "maybe")
                deadline = $null
                guestLimit = 2
                dietaryPreferences = $false
            }
            tags = @($Prefix, $Name)
            preview = "/templates/previews/$Id.webp"
            createdAt = (Get-Date -Format "yyyy-MM-dd")
        }

        $ConfigPath = Join-Path $Folder "template.json"

        if (-not (Test-Path $ConfigPath)) {
            $Config | ConvertTo-Json -Depth 12 |
                Set-Content -Path $ConfigPath -Encoding UTF8
        }

        $ComponentPath = Join-Path $Folder "index.jsx"

        if (-not (Test-Path $ComponentPath)) {
            $Component = @"
// ORYNZA template: $Id
// Design implementation placeholder.
// Replace this component with the finished template design.

export default function Template() {
  return (
    <article
      data-template-id="$Id"
      className="orynza-template"
    >
      <h1>$Name</h1>
      <p>Template design pending.</p>
    </article>
  );
}
"@
            Set-Content -Path $ComponentPath -Value $Component -Encoding UTF8
        }

        $Catalog += [PSCustomObject]@{
            id = $Id
            name = $Name
            category = $Prefix
            categoryName = $Group.Name
            status = "draft"
            configPath = "categories/$Prefix/$Id/template.json"
            componentPath = "categories/$Prefix/$Id/index.jsx"
        }

        $Total++
    }
}

# Write shared configuration files.
$Palettes | ConvertTo-Json -Depth 8 |
    Set-Content "$Base\palettes\palettes.json" -Encoding UTF8

@{
    colorFields = @(
        "primary", "secondary", "accent", "background",
        "heading", "body", "border", "decoration"
    )
    typographyFields = @(
        "headingFont", "bodyFont", "headingSize", "bodySize"
    )
    backgroundTypes = @("solid", "gradient", "image", "pattern")
    layoutOptions = @("portrait", "square", "landscape")
    outputFormats = @("png", "jpg", "pdf")
} | ConvertTo-Json -Depth 8 |
    Set-Content "$Base\customization\schema.json" -Encoding UTF8

@{
    defaultEnabled = $false
    responseOptions = @("attending", "not-attending", "maybe")
    fields = @(
        "guestName", "guestCount", "email",
        "dietaryPreferences", "message"
    )
    features = @{
        deadline = $true
        guestLimit = $true
        dietaryPreferences = $true
        confirmationMessage = $true
        calendarLink = $true
    }
    note = "Backend integration is required to collect and store responses."
} | ConvertTo-Json -Depth 8 |
    Set-Content "$Base\rsvp\defaults.json" -Encoding UTF8

@"
export { default as TemplateCard } from "./TemplateCard";
"@ | Set-Content "$Base\components\index.js" -Encoding UTF8

@"
import catalog from "./catalog/templates.json";

export function getAllTemplates() {
  return catalog.templates;
}

export function getTemplateById(id) {
  return catalog.templates.find(template => template.id === id);
}

export function getTemplatesByCategory(category) {
  return catalog.templates.filter(
    template => template.category === category
  );
}
"@ | Set-Content "$Base\index.js" -Encoding UTF8

@{
    version = 1
    totalTemplates = $Total
    totalCategories = $Groups.Count
    categories = @(
        foreach ($Prefix in $Groups.Keys) {
            @{
                id = $Prefix
                name = $Groups[$Prefix].Name
                templateCount = 10
            }
        }
    )
    templates = $Catalog
} | ConvertTo-Json -Depth 12 |
    Set-Content "$Base\catalog\templates.json" -Encoding UTF8

Write-Host ""
Write-Host "ORYNZA template library setup completed." -ForegroundColor Green
Write-Host "Categories: $($Groups.Count)"
Write-Host "Template folders: $Total"
Write-Host "Colour palettes: $($Palettes.Count)"
Write-Host "Location: $Base"
Write-Host ""