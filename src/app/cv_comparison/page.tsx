"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Briefcase, Download, GraduationCap, Star, User, Mail, Phone, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../../../components/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import { useToast } from "../../../hooks/use-toast"
import { Separator } from "../../../components/separator"
import { Badge } from "../../../components/badge"

// This would typically come from a shared data source or context
// For now, we'll duplicate the data for demonstration purposes
const allCandidates = [
    {
        id: 1,
        name: "Alex Johnson",
        position: "Frontend Developer",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        matchScore: 92,
        skills: ["React", "TypeScript", "CSS", "Node.js", "Redux", "GraphQL", "Jest", "Webpack"],
        experience: [
            {
                company: "Tech Solutions Inc.",
                position: "Senior Frontend Developer",
                duration: "2020 - Present",
                description:
                    "Led the development of multiple web applications using React and TypeScript. Implemented state management with Redux and integrated with GraphQL APIs.",
            },
            {
                company: "Digital Innovations",
                position: "Frontend Developer",
                duration: "2018 - 2020",
                description:
                    "Developed responsive web interfaces using React and CSS. Collaborated with UX designers to implement user-friendly interfaces.",
            },
        ],
        education: [
            {
                institution: "University of California, Berkeley",
                degree: "B.S. Computer Science",
                duration: "2014 - 2018",
            },
        ],
        yearsOfExperience: 5,
        selected: true,
    },
    {
        id: 2,
        name: "Jamie Smith",
        position: "UX Designer",
        email: "jamie.smith@example.com",
        phone: "+1 (555) 234-5678",
        location: "New York, NY",
        matchScore: 88,
        skills: ["Figma", "UI/UX", "Prototyping", "User Research", "Adobe XD", "Sketch", "InVision", "Design Systems"],
        experience: [
            {
                company: "Creative Design Studio",
                position: "Senior UX Designer",
                duration: "2019 - Present",
                description:
                    "Led user research and created wireframes, prototypes, and high-fidelity designs for web and mobile applications. Collaborated with development teams to ensure design implementation.",
            },
            {
                company: "Digital Agency",
                position: "UI/UX Designer",
                duration: "2017 - 2019",
                description:
                    "Designed user interfaces for various clients across different industries. Conducted usability testing and iterated on designs based on user feedback.",
            },
        ],
        education: [
            {
                institution: "Rhode Island School of Design",
                degree: "M.A. Design",
                duration: "2015 - 2017",
            },
            {
                institution: "New York University",
                degree: "B.A. Fine Arts",
                duration: "2011 - 2015",
            },
        ],
        yearsOfExperience: 4,
        selected: true,
    },
    {
        id: 4,
        name: "Morgan Lee",
        position: "Backend Developer",
        email: "morgan.lee@example.com",
        phone: "+1 (555) 456-7890",
        location: "Seattle, WA",
        matchScore: 78,
        skills: ["Java", "Spring", "SQL", "AWS", "Microservices", "Kafka", "Docker", "Kubernetes"],
        experience: [
            {
                company: "Enterprise Solutions",
                position: "Senior Backend Developer",
                duration: "2017 - Present",
                description:
                    "Designed and implemented microservices architecture for high-traffic applications. Optimized database queries and implemented caching strategies for improved performance.",
            },
            {
                company: "Financial Tech",
                position: "Java Developer",
                duration: "2015 - 2017",
                description:
                    "Developed backend services for financial applications. Implemented secure payment processing systems and integrated with third-party APIs.",
            },
        ],
        education: [
            {
                institution: "University of Washington",
                degree: "M.S. Computer Science",
                duration: "2013 - 2015",
            },
            {
                institution: "Stanford University",
                degree: "B.S. Computer Science",
                duration: "2009 - 2013",
            },
        ],
        yearsOfExperience: 6,
        selected: true,
    },
]

export default function CVComparisonPage() {
    const { toast } = useToast()
    const [selectedCandidates, setSelectedCandidates] = useState<typeof allCandidates>([])
    const [activeTab, setActiveTab] = useState("overview")

    // In a real app, this would fetch from an API or context
    useEffect(() => {
        // Filter only selected candidates
        const selected = allCandidates.filter((candidate) => candidate.selected)
        setSelectedCandidates(selected)
    }, [])

    // Generate CSV for export
    const exportComparison = () => {
        toast({
            title: "Comparison exported",
            description: `Comparison of ${selectedCandidates.length} candidates has been exported.`,
            duration: 3000,
        })
    }

    // If no candidates are selected
    if (selectedCandidates.length === 0) {
        return (
            <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/cv-ranking">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold">Candidate Comparison</h1>
                    </div>

                    <Card className="w-full p-6 text-center">
                        <CardTitle className="mb-4">No candidates selected for comparison</CardTitle>
                        <p className="text-muted-foreground mb-6">
                            Please select at least two candidates from the ranking page to compare them.
                        </p>
                        <Button asChild>
                            <Link href="/cv-ranking">Go to Ranking Page</Link>
                        </Button>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/cv-ranking">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold">Candidate Comparison</h1>
                    </div>
                    <Button onClick={exportComparison}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Comparison
                    </Button>
                </div>

                <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6 h-12">
                        <TabsTrigger value="overview" className="text-sm sm:text-base">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="skills" className="text-sm sm:text-base">
                            Skills
                        </TabsTrigger>
                        <TabsTrigger value="experience" className="text-sm sm:text-base">
                            Experience
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Candidate profiles */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {selectedCandidates.map((candidate) => (
                                    <Card key={candidate.id} className="overflow-hidden">
                                        <CardHeader className="pb-2 text-center bg-muted/30">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-primary/20">
                                                    <Image
                                                        src="/placeholder.svg?height=80&width=80"
                                                        alt={candidate.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl">{candidate.name}</CardTitle>
                                                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                                                </div>
                                                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                                    <span className="font-medium">{candidate.matchScore}% Match</span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                                    <span className="text-sm">{candidate.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                                    <span className="text-sm">{candidate.yearsOfExperience} years experience</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                                    <span className="text-sm truncate">{candidate.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                                    <span className="text-sm">{candidate.phone}</span>
                                                </div>

                                                <Separator />

                                                <div>
                                                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                                                        <GraduationCap className="h-4 w-4 text-primary" />
                                                        Education
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {candidate.education.map((edu, index) => (
                                                            <li key={index} className="text-sm">
                                                                <div className="font-medium">{edu.degree}</div>
                                                                <div className="text-muted-foreground text-xs flex items-center gap-1">
                                                                    <span>{edu.institution}</span>
                                                                    <span>•</span>
                                                                    <span>{edu.duration}</span>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="pt-2">
                                                    <Button size="sm" variant="outline" className="w-full" asChild>
                                                        <Link href={`/cv-details/${candidate.id}`}>View Full Profile</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Skills comparison */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        Top Skills Comparison
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {selectedCandidates.map((candidate) => (
                                            <div key={`${candidate.id}-skills-overview`} className="space-y-2">
                                                <h3 className="font-medium text-center">{candidate.name}</h3>
                                                <div className="flex flex-wrap gap-1 justify-center">
                                                    {candidate.skills.slice(0, 5).map((skill, index) => (
                                                        <Badge key={index} variant="secondary" className="mb-1">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Experience comparison */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Briefcase className="h-5 w-5 text-primary" />
                                        Latest Experience
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {selectedCandidates.map((candidate) => (
                                            <div key={`${candidate.id}-exp-overview`} className="space-y-2">
                                                <h3 className="font-medium text-center">{candidate.name}</h3>
                                                {candidate.experience.length > 0 && (
                                                    <div className="border-l-2 border-primary/20 pl-3 py-1">
                                                        <div className="font-medium text-sm">{candidate.experience[0].position}</div>
                                                        <div className="text-muted-foreground text-xs flex items-center gap-1">
                                                            <span>{candidate.experience[0].company}</span>
                                                            <span>•</span>
                                                            <span>{candidate.experience[0].duration}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="skills" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Skills Comparison
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {selectedCandidates.map((candidate) => (
                                        <div key={`${candidate.id}-skills-full`} className="space-y-4">
                                            <h3 className="font-medium text-center text-lg">{candidate.name}</h3>
                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {candidate.skills.map((skill, index) => (
                                                    <Badge key={index} variant="secondary" className="mb-1">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-6" />

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-lg mb-4">Common Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {/* Find skills that all candidates have */}
                                            {selectedCandidates.length > 0 &&
                                                selectedCandidates[0].skills
                                                    .filter((skill) => selectedCandidates.every((candidate) => candidate.skills.includes(skill)))
                                                    .map((skill, index) => (
                                                        <Badge key={index} variant="default" className="mb-1 px-3 py-1">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                            {selectedCandidates.length > 0 &&
                                                selectedCandidates[0].skills.filter((skill) =>
                                                    selectedCandidates.every((candidate) => candidate.skills.includes(skill)),
                                                ).length === 0 && (
                                                    <p className="text-sm text-muted-foreground">No common skills found among all candidates.</p>
                                                )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-lg mb-4">Unique Skills by Candidate</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {selectedCandidates.map((candidate, candidateIndex) => {
                                                // Find unique skills that only this candidate has
                                                const uniqueSkills = candidate.skills.filter((skill) => {
                                                    return selectedCandidates.every((otherCandidate, otherIndex) => {
                                                        if (candidateIndex === otherIndex) return true
                                                        return !otherCandidate.skills.includes(skill)
                                                    })
                                                })

                                                return (
                                                    <div key={`${candidate.id}-unique-skills`} className="space-y-2">
                                                        <h4 className="font-medium text-center">{candidate.name}</h4>
                                                        <div className="flex flex-wrap gap-1 justify-center">
                                                            {uniqueSkills.length > 0 ? (
                                                                uniqueSkills.map((skill, index) => (
                                                                    <Badge key={index} variant="outline" className="mb-1">
                                                                        {skill}
                                                                    </Badge>
                                                                ))
                                                            ) : (
                                                                <span className="text-sm text-muted-foreground">No unique skills</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="experience" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-primary" />
                                    Work Experience
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {selectedCandidates.map((candidate) => (
                                        <div key={`${candidate.id}-experience-details`} className="space-y-4">
                                            <h3 className="font-medium text-center text-lg">{candidate.name}</h3>
                                            <div className="space-y-4">
                                                {candidate.experience.map((exp, index) => (
                                                    <div key={index} className="border-l-2 border-primary/20 pl-4 py-1">
                                                        <div className="font-medium">{exp.position}</div>
                                                        <div className="text-muted-foreground text-sm flex items-center gap-1 mb-2">
                                                            <span>{exp.company}</span>
                                                            <span>•</span>
                                                            <span className="flex items-center">
                                                                <Calendar className="h-3 w-3 mr-1" />
                                                                {exp.duration}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm">{exp.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-6" />

                                <div>
                                    <CardTitle className="text-lg flex items-center gap-2 mb-4">
                                        <GraduationCap className="h-5 w-5 text-primary" />
                                        Education
                                    </CardTitle>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {selectedCandidates.map((candidate) => (
                                            <div key={`${candidate.id}-education-details`} className="space-y-4">
                                                <h3 className="font-medium text-center">{candidate.name}</h3>
                                                <div className="space-y-3">
                                                    {candidate.education.map((edu, index) => (
                                                        <div key={index} className="border-l-2 border-primary/20 pl-4 py-1">
                                                            <div className="font-medium">{edu.degree}</div>
                                                            <div className="text-muted-foreground text-sm flex items-center gap-1">
                                                                <span>{edu.institution}</span>
                                                                <span>•</span>
                                                                <span className="flex items-center">
                                                                    <Calendar className="h-3 w-3 mr-1" />
                                                                    {edu.duration}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
