"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("../schemas/blog.schema");
const comment_schema_1 = require("../schemas/comment.schema");
let BlogService = class BlogService {
    blogModel;
    commentModel;
    constructor(blogModel, commentModel) {
        this.blogModel = blogModel;
        this.commentModel = commentModel;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    async create(blogData) {
        const slug = this.generateSlug(blogData.title);
        const existing = await this.blogModel.findOne({ slug });
        if (existing)
            throw new common_1.ConflictException('A blog with this title already exists');
        const blog = new this.blogModel({ ...blogData, slug });
        return blog.save();
    }
    async findAll() {
        return this.blogModel.find({ isPublished: true }).sort({ createdAt: -1 }).exec();
    }
    async findBySlug(slug) {
        const blog = await this.blogModel.findOne({ slug, isPublished: true }).exec();
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async findOne(id) {
        const blog = await this.blogModel.findById(id).exec();
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async update(id, updateData) {
        const blog = await this.blogModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async delete(id) {
        return this.blogModel.findByIdAndDelete(id).exec();
    }
    async like(id) {
        const blog = await this.blogModel.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true }).exec();
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async addComment(blogId, commentData) {
        const comment = new this.commentModel({ ...commentData, blogId });
        return comment.save();
    }
    async getComments(blogId) {
        return this.commentModel.find({ blogId: blogId, isApproved: true }).sort({ createdAt: -1 }).exec();
    }
    async seedBlogs() {
        const seedData = [
            {
                title: "The Thermodynamics of Tempering: A Masterclass",
                summary: "Beyond just melting chocolate, learn the molecular science of crystal structures that gives our ganache its signature mirror-finish snap.",
                content: `
          <h1>The Science of the Snap</h1>
          <p>Chocolate is not merely an ingredient; it is a complex, polymorphic substance that requires precision akin to high-stakes chemistry. When we temper chocolate at Dobi Cakes, we are essentially managing the creation of Beta V crystals—the most stable and aesthetically pleasing form of cocoa butter crystals.</p>
          <blockquote>"To master chocolate is to master time and temperature in perfect synchronicity."</blockquote>
          <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=1200" alt="Chocolate Tempering" />
          <h2>The Three Pillars of Tempering</h2>
          <p>Achieving that elusive glossy finish and the crisp 'snap' when you bite into a truffle requires rigorous adherence to the three pillars of tempering: Time, Temperature, and Agitation. Without these, your chocolate may become 'bloomed'—that unappealing gray film caused by fat migration.</p>
          <ul>
            <li><strong>Melting:</strong> Heating to exactly 45°C to break down all existing crystal structures.</li>
            <li><strong>Cooling:</strong> Rapidly bringing the temperature down to 27°C to encourage the initial formation of crystals.</li>
            <li><strong>Reheating:</strong> Gently lifting the temperature back to 31°C to melt away unstable Type I-IV crystals, leaving only the superior Type V.</li>
          </ul>
          <h2>Why It Matters to the Palate</h2>
          <p>Tempered chocolate doesn't just look better; it melts at a higher temperature, meaning it won't smudge on your fingers but will melt instantly upon contact with the warmth of your tongue, releasing a complex profile of earthy, fruity, and nutty notes characteristic of our West African cocoa beans.</p>
        `,
                author: "Adaobi Okafor",
                tags: ["Masterclass", "Chocolate", "Technique"],
                image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=1200",
                readingTime: 8,
                isPublished: true
            },
            {
                title: "The Heritage of Nigerian Sugars",
                summary: "Exploring the unrefined, local sweeteners that give our cakes a depth of flavor you won't find in mass-produced pastries.",
                content: `
          <h1>Sweetness with Soul</h1>
          <p>For decades, the global pastry industry has been obsessed with refined white sugar. At Dobi Cakes, we are looking back to our roots. By incorporating unrefined cane sugars and local honey from the northern plains, we introduce a 'terroir' to our baking that is uniquely Nigerian.</p>
          <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200" alt="Artisanal Sugar" />
          <h2>The Molasses Profile</h2>
          <p>Our signature 'Heritage Sponge' uses a blend of local muscovado. This sugar still contains its natural molasses, providing a moisture level and a deep, almost smoky caramel note that complements our spice-infused frostings perfectly.</p>
          <blockquote>"Sugar should be more than just a sweetener; it should be a flavor profile in its own right."</blockquote>
          <h2>Supporting Local Ecosystems</h2>
          <p>Beyond flavor, sourcing our sweeteners from artisanal cooperatives ensures that we are preserving traditional sugar-making techniques that have been in families for generations. It is a commitment to the flavor of the past and the sustainability of the future.</p>
          <ul>
            <li>Cold-pressed raw cane juice</li>
            <li>Wildflower honey from the Savanna</li>
            <li>Hand-harvested palm sugar</li>
          </ul>
        `,
                author: "Lead Artisanal Chef",
                tags: ["Heritage", "Sustainability", "Ingredients"],
                image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200",
                readingTime: 6,
                isPublished: true
            },
            {
                title: "Architecture of a Tiered Masterpiece",
                summary: "A behind-the-scenes look at the structural engineering required to create our gravity-defying wedding cakes.",
                content: `
          <h1>Engineering Elegance</h1>
          <p>When a bride asks for a seven-tiered cake, she is asking for more than a dessert; she is asking for a structural triumph. Each Dobi tiered cake is built using internal supports that are mathematically calculated to distribute weight without compromising the delicate crumb of the sponge.</p>
          <img src="https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&q=80&w=1200" alt="Wedding Cake Structure" />
          <h2>The Doweling System</h2>
          <p>We use a combination of food-grade bamboo dowels and central support rods. Each tier sits on its own cake board, which rests on the dowels of the tier below. This ensures that the bottom tier isn't actually carrying the full weight of the six tiers above it—the support structure is.</p>
          <blockquote>"A wedding cake should be as stable as the marriage it celebrates."</blockquote>
          <h2>Transport: The Final Challenge</h2>
          <p>Building it is only half the battle. Transporting a 50kg cake through the vibrant, often bumpy streets of Lagos requires specialized refrigeration and custom-built shock-absorbing delivery vehicles. It's a logistical ballet that we perform every weekend to ensure your masterpiece arrives in flawless condition.</p>
        `,
                author: "Adaobi Okafor",
                tags: ["Wedding Cakes", "Engineering", "Behind the Scenes"],
                image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?auto=format&fit=crop&q=80&w=1200",
                readingTime: 7,
                isPublished: true
            }
        ];
        for (const blog of seedData) {
            const slug = this.generateSlug(blog.title);
            await this.blogModel.findOneAndUpdate({ slug }, { ...blog, slug }, { upsert: true, new: true });
        }
        return { message: "Seeding complete", count: seedData.length };
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __param(1, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BlogService);
//# sourceMappingURL=blog.service.js.map